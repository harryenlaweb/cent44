import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Alumnos } from '../../../lib/collections/alumnos';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.alumnos.onCreated(function(){       
  this.selAlumnoInfo = new ReactiveVar(null);
  this.selAlumnoEditar = new ReactiveVar(null);  
  this.selAlumnoChangePass = new ReactiveVar(null);  
});

Template.alumnos.helpers({
    searchAttributes() {
      return {
          placeholder: 'Buscar ...',
      };
    },    

    alumnoInfo: function() {     
      return Template.instance().selAlumnoInfo.get();        
    },

    alumnoEditar: function() {     
      return Template.instance().selAlumnoEditar.get();        
    },

    alumnoChangePass: function() {     
      return Template.instance().selAlumnoChangePass.get();        
    },

    
});


Template.alumnos.events({
  'click .remove': function(event, template){   
    Meteor.call('alumnos.remove',this._id);
  },

  'click .modalAlumnoInfo': function(event, template){   
    var alumno = Alumnos.findOne({"_id":this._id});      
    Template.instance().selAlumnoInfo.set(alumno);
    $('#modalAlumnoInfo').modal('show');
    },    

    'click .modalAlumnoEditar': function(event, template){   
      var alumno = Alumnos.findOne({"_id":this._id});      
      Template.instance().selAlumnoEditar.set(alumno);
      $('#modalAlumnoEditar').modal('show');
    }, 

    'click .modalAlumnoChangePass': function(event, template){   
      var alumno = Alumnos.findOne({"_id":this._id});      
      Template.instance().selAlumnoChangePass.set(alumno);
      $('#modalAlumnoChangePass').modal('show');
    }, 

    'submit #formChangePassAlumno': function(event){
        event.preventDefault();        
        var newpass = event.target.newpass.value;
        var newpassaux = event.target.newpassaux.value;        
        var alumno = Template.instance().selAlumnoChangePass.get();
        var idUser = alumno.idUser;

        console.log(idUser);
        console.log(newpass);
            if (newpass == newpassaux){ //puedo proceder a cambiar el password                            
              Meteor.call('changePass',idUser,newpass,function(err,result){
                if(!err){
                 console.log("Congrats you change the password")
                 $('#modalAlumnoChangePass').modal('hide'); //CIERRO LA VENTANA MODAL
                }else{
                  console.log("pup there is an error caused by " + err.reason)
                }
              })              
            } else{              
              alert("Las contraseñas no coinciden");
            }                  
    },

    'submit #formModificarAlumno':function(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;  

      if (target.nombreApellido.value){var ingresoNombre = target.nombreApellido.value};
      if (target.dni.value){var ingresoDni = target.dni.value};      
      if (target.legajo.value){var ingresoLegajo = target.legajo.value};      
      if (target.telefono.value){var ingresoTelefono = target.telefono.value};
      if (target.direccion.value){var ingresoDireccion = target.direccion.value};   
      if (target.localidad.value){var ingresoLocalidad = target.localidad.value};   
      if (target.provincia.value){var ingresoProvincia = target.provincia.value};   
      if (target.email.value){var ingresoEmail = target.email.value};         
      if (target.fechaNacimiento2.value){
        var ingresoFechaNacimiento = target.fechaNacimiento2.value;
        ingresoFechaNacimiento = moment(ingresoFechaNacimiento, "DD-MM-YYYY");
        ingresoFechaNacimiento = new Date(ingresoFechaNacimiento);//.toDateString("dd-MM-yyyy");
        
      };
      if (target.fechaIngreso2.value){
        var ingresoFechaIngreso = target.fechaIngreso2.value;
        ingresoFechaIngreso = moment(ingresoFechaIngreso, "DD-MM-YYYY");
        ingresoFechaIngreso = new Date(ingresoFechaIngreso);//.toDateString("dd-MM-yyyy");        
      };
      if (target.descripcion.value){var ingresoDescripcion = target.descripcion.value};        

      var espacio = " "; 
      var combinacion = ingresoNombre.concat(espacio);
      combinacion = combinacion.concat(ingresoDni);
      
      var alumno = Template.instance().selAlumnoEditar.get();

      Alumnos.update({_id:alumno._id},{$set: {
        nombreApellido:ingresoNombre, 
        dni:ingresoDni, 
        legajo:ingresoLegajo,
        nombreDni:combinacion,        
        telefono:ingresoTelefono,
        direccion:ingresoDireccion,
        localidad:ingresoLocalidad,
        provincia:ingresoProvincia,
        email:ingresoEmail,        
        fechaNacimiento:ingresoFechaNacimiento,
        fechaIngreso:ingresoFechaIngreso,
        descripcion:ingresoDescripcion,        
      }});

      $('#modalAlumnoEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  },
})


Template.alumnos.onRendered(function() {
  //$('.fechaNacimiento').mask('dd/mm/aaaa');
  $("#fechaNacimiento2").inputmask("d-m-y");
  $("#fechaIngreso2").inputmask("d-m-y");

  Meteor.typeahead.inject();

});

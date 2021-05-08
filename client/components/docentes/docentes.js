import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Docentes } from '../../../lib/collections/docentes';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.docentes.onCreated(function(){       
  this.selDocenteInfo = new ReactiveVar(null);
  this.selDocenteEditar = new ReactiveVar(null);  
  this.selDocenteChangePass = new ReactiveVar(null);  
});

Template.docentes.helpers({
    searchAttributes() {
      return {
          placeholder: 'Buscar ...',
      };
    },    

    docenteInfo: function() {     
      return Template.instance().selDocenteInfo.get();        
    },

    docenteEditar: function() {     
      return Template.instance().selDocenteEditar.get();        
    },

    docenteChangePass: function() {     
      return Template.instance().selDocenteChangePass.get();        
    },

    
});


Template.docentes.events({
  'click .remove': function(event, template){   
    Meteor.call('docentes.remove',this._id);
  },

  'click .modalDocenteInfo': function(event, template){   
    var docente = Docentes.findOne({"_id":this._id});      
    Template.instance().selDocenteInfo.set(docente);
    $('#modalDocenteInfo').modal('show');
    },    

    'click .modalDocenteEditar': function(event, template){   
      var docente = Docentes.findOne({"_id":this._id});      
      Template.instance().selDocenteEditar.set(docente);
      $('#modalDocenteEditar').modal('show');
    }, 

    'click .modalDocenteChangePass': function(event, template){   
      var docente = Docentes.findOne({"_id":this._id});      
      Template.instance().selDocenteChangePass.set(docente);
      $('#modalDocenteChangePass').modal('show');
    }, 

    'submit #formChangePassDocente': function(event){
        event.preventDefault();        
        var newpass = event.target.newpass.value;
        var newpassaux = event.target.newpassaux.value;        
        var docente = Template.instance().selDocenteChangePass.get();
        var idUser = docente.idUser;

        console.log(idUser);
        console.log(newpass);
            if (newpass == newpassaux){ //puedo proceder a cambiar el password                            
              Meteor.call('changePass',idUser,newpass,function(err,result){
                if(!err){
                 console.log("Congrats you change the password")
                 $('#modalDocenteChangePass').modal('hide'); //CIERRO LA VENTANA MODAL
                }else{
                  console.log("pup there is an error caused by " + err.reason)
                }
              })              
            } else{              
              alert("Las contraseñas no coinciden");
            }                  
    },

    'submit #formModificarDocente':function(event) {
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
      
      var docente = Template.instance().selDocenteEditar.get();

      Docentes.update({_id:docente._id},{$set: {
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

      $('#modalDocenteEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  },
})


Template.docentes.onRendered(function() {
  //$('.fechaNacimiento').mask('dd/mm/aaaa');
  $("#fechaNacimiento2").inputmask("d-m-y");
  $("#fechaIngreso2").inputmask("d-m-y");

  Meteor.typeahead.inject();

});

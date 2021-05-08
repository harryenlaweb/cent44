import { Alumnos } from '../../../lib/collections/alumnos';
import { Carreras } from '../../../lib/collections/carreras';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.alumnoForm.onCreated(function(){    
  this.selCarrera = new ReactiveVar(null);  
});

Template.alumnoForm.helpers({
  formCollection() {
    return Alumnos;
  },

  selecCarrera: function(event, suggestion, datasetName) {
    Template.instance().selCarrera.set(suggestion.id);     
  },

  carreras: function() {     
    return Carreras.find().fetch().map(function(object){ return {id: object._id, value: object.nombre}; });    
  },

})


Template.alumnoForm.events({

  "submit #alumnoForm": function(event, template){   //captura el evento submit del formulario
    event.preventDefault();
    const target=event.target;

    var ingresoNombreApellido = null;
    var ingresoDni = null; 
    var ingresoLegajo = null; 
    var ingresoNombreDni = null;
    var ingresoTelefono = null; 
    var ingresoDireccion = null; 
    var ingresoLocalidad = null; 
    var ingresoProvincia= null;
    var ingresoEmail = null;    
    var ingresoFechaNacimiento = new Date(); 
    var ingresoFechaIngreso = new Date(); 
    var ingresoDescripcion = null;
    ingresoCarrera = Template.instance().selCarrera.get();      

    if (target.nombreApellido.value){ingresoNombreApellido = target.nombreApellido.value};
    if (target.dni.value){ingresoDni = target.dni.value};       
    if (target.legajo.value){ingresoLegajo = target.legajo.value};       
    if (target.telefono.value){ingresoTelefono = target.telefono.value};
    if (target.direccion.value){ingresoDireccion = target.direccion.value};   
    if (target.localidad.value){ingresoLocalidad = target.localidad.value};   
    if (target.provincia.value){ingresoProvincia = target.provincia.value};   
    if (target.email.value){ingresoEmail = target.email.value};       

    if (target.fechaNacimiento.value){      
      ingresoFechaNacimiento = target.fechaNacimiento.value;    
      ingresoFechaNacimiento = moment(ingresoFechaNacimiento, "DD-MM-YYYY");
      ingresoFechaNacimiento = new Date(ingresoFechaNacimiento);//.toDateString("dd-MM-yyyy");      
    };    
    if (target.fechaIngreso.value){
      ingresoFechaIngreso = target.fechaIngreso.value;
      ingresoFechaIngreso = moment(ingresoFechaIngreso, "DD-MM-YYYY");
      ingresoFechaIngreso = new Date(ingresoFechaIngreso);//.toDateString("dd-MM-yyyy");
    };

    if (target.descripcion.value){ingresoDescripcion = target.descripcion.value};     

    var espacio = " "; 
    var combinacion = ingresoNombreApellido.concat(espacio);
    combinacion = combinacion.concat(ingresoDni);

    var carr = null;
    var carreraSeleccionada = Carreras.findOne({"_id":ingresoCarrera});//obtengo la Carrera seleccionada (objeto)     
    if (carreraSeleccionada){
      carr = {  _id: carreraSeleccionada._id,
                nombreCarrera: carreraSeleccionada.nombre,

      }
      carr = [carr];      
    } 

    var usuario= new Object();            
      usuario.email=target.email.value;   
      usuario.dni=target.dni.value;   
      usuario.cargo_roles="alumno";    

     Meteor.call("new_user", usuario, function(error, result){  //llamo al metedo que crea el usuario del lado servidor      
       if(error){
         alert(error.message);
         console.log("error", error);
         console.log("result",result); //en caso de error tengo que definir una funcion
       }
       if(result){         
         Alumnos.insert({ 
          idUser:result,
          nombreApellido:ingresoNombreApellido, 
          dni:ingresoDni,
          legajo:ingresoLegajo,
          miscarreras:carr,
          nombreDni:combinacion,          
          telefono:ingresoTelefono,
          direccion:ingresoDireccion,
          localidad:ingresoLocalidad,
          provincia:ingresoProvincia,
          email:ingresoEmail,
          fechaNacimiento:ingresoFechaNacimiento,
          fechaIngreso:ingresoFechaIngreso,
          descripcion:ingresoDescripcion,
          rol:"alumno",
        });

        Router.go('alumnos'); //al crear el usuario devuelvo el perfil creado
       }
     });


  },
});
Template.alumnoForm.onRendered(function(){
  //$("#dni").inputmask("99999999");
  $("#dni").inputmask("9999999[9]"); //mask with dynamic syntax

  Meteor.typeahead.inject();

})

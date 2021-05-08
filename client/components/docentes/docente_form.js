import { Docentes } from '../../../lib/collections/docentes';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.docenteForm.helpers({
  formCollection() {
    return Docentes;
  },
})


Template.docenteForm.events({

  "submit #docenteForm": function(event, template){   //captura el evento submit del formulario
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

    var usuario= new Object();            
      usuario.email=target.email.value;   
      usuario.dni=target.dni.value;   
      usuario.cargo_roles="docente";      

     Meteor.call("new_user", usuario, function(error, result){  //llamo al metedo que crea el usuario del lado servidor      
       if(error){
         alert(error.message);         
       }
       if(result){         
         Docentes.insert({ 
          idUser:result,
          nombreApellido:ingresoNombreApellido, 
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
          rol:"docente",
        });

        Router.go('docentes'); //al crear el usuario devuelvo el perfil creado
       }
     });


  },
});
Template.docenteForm.onRendered(function(){
  //$("#dni").inputmask("99999999");
  $("#dni").inputmask("9999999[9]"); //mask with dynamic syntax

})

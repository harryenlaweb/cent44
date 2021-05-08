import { Materias } from '../../../lib/collections/materias';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.materiaForm.onCreated(function(){    
  this.selCarrera2 = new ReactiveVar(null);
  this.selDocente2 = new ReactiveVar(null);
});

Template.materiaForm.helpers({
	formCollection() {
		return Materias;
	},
	
	selecCarrera: function(event, suggestion, datasetName) {
		Template.instance().selCarrera2.set(suggestion.id);  		
	},

	carreras1: function() {     
		return Carreras.find().fetch().map(function(object){ return {id: object._id, value: object.nombre}; });    
	},
	
	selecDocente: function(event, suggestion, datasetName) {
		Template.instance().selDocente2.set(suggestion.id);  		
	},

	docentes1: function() {     
		return Docentes.find().fetch().map(function(object){ return {id: object._id, value: object.nombreDni}; });    
	},
})

Template.materiaForm.onCreated(function()
{
	AutoForm.addHooks(['materiaForm'],{
		onSuccess: function(operation, result, template)
		{
			Router.go('/materias');
		}
	});
})

Template.materiaForm.events({  

    'submit #formMateria':function(event) {
	    // Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;	
		var ingresoNombre = null;
		var ingresoCarrera = null; 
		var ingresoDocente = null;	
		var ingresoDescripcion = null;	


		if (target.nombre.value){ingresoNombre = target.nombre.value};		
		ingresoCarrera = Template.instance().selCarrera2.get();      
		ingresoDocente = Template.instance().selDocente2.get(); 	
		
		if (target.descripcion.value){ingresoDescripcion = target.descripcion.value};					

		var idCarrera;	
		var nombreCarrera;	
		var carreraSeleccionada = Carreras.findOne({"_id":ingresoCarrera});//obtengo la Carrera seleccionada (objeto)     
		if (carreraSeleccionada){
			idCarrera = carreraSeleccionada._id;	
			nombreCarrera = carreraSeleccionada.nombre;		
		} 

		var idDocente;		
		var nombreDocente;
		var dniDocente;
		var docenteSeleccionada = Docentes.findOne({"_id":ingresoDocente});//obtengo el docente seleccionado (objeto)     
		if (docenteSeleccionada){
			idDocente = docenteSeleccionada._id;			
			nombreDocente = docenteSeleccionada.nombreApellido;
			dniDocente = docenteSeleccionada.dni;
		} 

		var espacio = " "; 
  	    var combinacion = ingresoNombre.concat(espacio);
  	    combinacion = combinacion.concat(nombreCarrera);
	  	
		Materias.insert({
			nombre:ingresoNombre, 			
			idCarrera:idCarrera,
			materiaCarrera: combinacion,
			nombreCarrera:nombreCarrera,			
			idDocente:idDocente,		
			nombreDocente:nombreDocente,
			dniDocente:dniDocente,	
			descripcion:ingresoDescripcion,			
		});
		
			
	    Router.go('/materias');
		}
});


Template.materiaForm.onRendered(function() {

	Meteor.typeahead.inject();
});
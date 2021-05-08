import { Materias } from '../../../lib/collections/materias';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { Carreras } from '../../../lib/collections/carreras';
import { Docentes } from '../../../lib/collections/docentes';
import { Llamados } from '../../../lib/collections/llamados';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

Template.mesaForm.onCreated(function(){    
  this.selLlamado = new ReactiveVar(null);
  this.selMateria = new ReactiveVar(null);  

  this.selPresidente = new ReactiveVar(null);
  this.selVocal1 = new ReactiveVar(null);
  this.selVocal2 = new ReactiveVar(null);
});

Template.mesaForm.helpers({
	formCollection() {
		return Materias;
	},
	formCollection() {
		return Llamados;
	},
	formCollection() {
		return Docentes;
	},
	
	selecLlamado: function(event, suggestion, datasetName) {
		Template.instance().selLlamado.set(suggestion.id);  		
	},
	llamados1: function() {     
		return Llamados.find().fetch().map(function(object){ return {id: object._id, value: object.llamadoNumero}; });    
	},

	selecMateria: function(event, suggestion, datasetName) {
		Template.instance().selMateria.set(suggestion.id);  		
	},
	materias1: function() {     
		return Materias.find().fetch().map(function(object){ return {id: object._id, value: object.materiaCarrera}; });    
	},
	
	selecPresidente: function(event, suggestion, datasetName) {
		Template.instance().selPresidente.set(suggestion.id);  		
	},
	selecVocal1: function(event, suggestion, datasetName) {
		Template.instance().selVocal1.set(suggestion.id);  		
	},
	selecVocal2: function(event, suggestion, datasetName) {
		Template.instance().selVocal2.set(suggestion.id);  		
	},

	docentes1: function() {     
		return Docentes.find().fetch().map(function(object){ return {id: object._id, value: object.nombreDni}; });    
	},
})

Template.mesaForm.events({  

    'submit #formMesa':function(event) {
	    // Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		const target = event.target;	
		var ingresoLlamado = null;
		var ingresoMateria = null;
		var ingresoPresidente = null;
		var ingresoVocal1 = null;
		var ingresoVocal2 = null;	
		var ingresoDescripcion = null;	
		
		ingresoLlamado = Template.instance().selLlamado.get();
		ingresoMateria = Template.instance().selMateria.get();      

		ingresoPresidente = Template.instance().selPresidente.get(); 	
		ingresoVocal1 = Template.instance().selVocal1.get(); 	
		ingresoVocal2 = Template.instance().selVocal2.get(); 	
		
		if (target.descripcion.value){ingresoDescripcion = target.descripcion.value};					

		var idLlamado;	
		var nombreLlamado;
		var numeroLlamado;
		var llamadoSeleccionado = Llamados.findOne({"_id":ingresoLlamado});
		if (llamadoSeleccionado){
			idLlamado = llamadoSeleccionado._id;
			nombreLlamdo = llamadoSeleccionado.nombre;
			numeroLlamado = llamadoSeleccionado.numero;			
		} 

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
	  	
		Mesas.insert({
			

			nombre:ingresoNombre, 			
			idCarrera:idCarrera,
			nombreCarrera:nombreCarrera,			
			idDocente:idDocente,		
			nombreDocente:nombreDocente,
			dniDocente:dniDocente,	
			descripcion:ingresoDescripcion,			
		});
		
			
	    Router.go('/mesas');
		}
});


Template.mesaForm.onRendered(function() {

	Meteor.typeahead.inject();
});
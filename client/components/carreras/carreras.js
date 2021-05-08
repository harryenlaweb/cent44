import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Carreras } from '../../../lib/collections/carreras';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.carreras.onCreated(function(){       
  this.selCarreraInfo = new ReactiveVar(null);
  this.selCarreraEditar = new ReactiveVar(null);
});

Template.carreras.helpers({
  	searchAttributes() {
    	return {
      		placeholder: 'Buscar ...',
    	};
  	},   	

  	carreraInfo: function() {     
    	return Template.instance().selCarreraInfo.get();        
  	},

  	carreraEditar: function() {     
    	return Template.instance().selCarreraEditar.get();        
  	},
});


Template.carreras.events({
	'click .remove': function(event, template){		
		Meteor.call('carreras.remove',this._id);
	},

	'click .modalCarreraInfo': function(event, template){   
      var carrera = Carreras.findOne({"_id":this._id});      
      Template.instance().selCarreraInfo.set(carrera);
      $('#modalCarreraInfo').modal('show');
    },    

	'click .modalCarreraEditar': function(event, template){   
      	var carrera = Carreras.findOne({"_id":this._id});      
      	Template.instance().selCarreraEditar.set(carrera);
      	$('#modalCarreraEditar').modal('show');
    }, 

  	'submit #formModificarCarrera':function(event) {
      	// Prevent default browser form submit
      	event.preventDefault();

        // Get value from form element
        const target = event.target;

      	var carrera = Template.instance().selCarreraEditar.get();

      	Carreras.update({_id:carrera._id},{$set: {
        	nombre : target.nombre.value,
        	codigo: target.codigo.value,        	
        	descripcion: target.descripcion.value,        	
      	}});
      

      	$('#modalCarreraEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  	},
})


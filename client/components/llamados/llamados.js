import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Llamados } from '../../../lib/collections/llamados';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var'

Template.llamados.onCreated(function(){       
  this.selLlamadoInfo = new ReactiveVar(null);
  this.selLlamadoEditar = new ReactiveVar(null);
});

Template.registerHelper('formatDate2', function(date) {
  return moment(date).format('DD-MM-YYYY');
});

Template.llamados.helpers({
  	searchAttributes() {
    	return {
      		placeholder: 'Buscar ...',
    	};
  	},

  	llamadoInfo: function() {     
    	return Template.instance().selLlamadoInfo.get();        
  	},

  	llamadoEditar: function() {     
    	return Template.instance().selLlamadoEditar.get();        
  	},
});


Template.llamados.events({
	

	'click .modalLlamadoInfo': function(event, template){   
      var llamado = Llamados.findOne({"_id":this._id});      
      Template.instance().selLlamadoInfo.set(llamado);
      $('#modalLlamadoInfo').modal('show');
    }, 
  
	'click .modalLlamadoEditar': function(event, template){   
      	var llamado = Llamados.findOne({"_id":this._id});      
      	Template.instance().selLlamadoEditar.set(llamado);
      	$('#modalLlamadoEditar').modal('show');
    }, 

  	'submit #formModificarLlamado':function(event) {
      	// Prevent default browser form submit
      	event.preventDefault();

        // Get value from form element
        const target = event.target;

        if (target.fechaDesde.value){
          var fechaDesde = target.fechaDesde.value;
          fechaDesde = moment(fechaDesde, "DD-MM-YYYY");
          fechaDesde = new Date(fechaDesde);//.toDateString("dd-MM-yyyy");          
        };

        if (target.fechaHasta.value){
          var fechaHasta = target.fechaHasta.value;
          fechaHasta = moment(fechaHasta, "DD-MM-YYYY");
          fechaHasta = new Date(fechaHasta);//.toDateString("dd-MM-yyyy");          
        };

      	var llamado = Template.instance().selLlamadoEditar.get();

      	Llamados.update({_id:llamado._id},{$set: {
        	nombre : target.nombre.value,
        	numero: target.numero.value,
        	fechaDesde: fechaDesde,
        	fechaHasta: fechaHasta,        	
        	descripcion: target.descripcion.value,        	
      	}});        

      	$('#modalLlamadoEditar').modal('hide'); //CIERRO LA VENTANA MODAL
      
  	},
})


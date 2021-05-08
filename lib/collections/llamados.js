import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Llamados = new Mongo.Collection('llamados');

export const LlamadosIndex = new EasySearch.Index({
	collection: Llamados,
	fields: ['nombre','numero','fechaDesde','fechaHasta'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

Llamados.attachSchema(new SimpleSchema({
	
	nombre: {type: String, label: 'Nombre'},

	numero: {	type: String, label: 'Número', optional: true },

	llamadoNumero: {	type: String, label: 'Nombre y número de llamado', optional: true },

	fechaDesde: { type: Date, label: 'Fecha Desde', optional: true },

	fechaHasta: { type: Date, label: 'Fecha Hasta', optional: true },	

	estado: {type: String, label: 'Estado', optional: true,
		autoform: {	type: "hidden"}
	},

	descripcion:{ type: String, label: 'Descripción del llamado', optional: true, 		
		autoform:{ type: "textarea", row: 10, class: "textarea"	}
	}﻿,

	owner:{	type: String, label: "Propietario",
		autoValue() {return this.userId	},
		autoform: {	type: "hidden"}
	},
	created: { type: Date,
			autoValue() {return new Date()},
		autoform: {	type: "hidden"}
	},	
	
}));

Llamados.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Llamados.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

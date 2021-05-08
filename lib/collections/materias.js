import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Materias = new Mongo.Collection('materias');

export const MateriasIndex = new EasySearch.Index({
	collection: Materias,
	fields: ['nombre','nombreCarrera','nombreDocente','dniDocente','materiaCarrera'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})


Materias.attachSchema(new SimpleSchema({
	nombre: {type: String,	label: 'Nombre'},
	
	idCarrera: {type: String, optional: true},	
	nombreCarrera: {type: String, optional: true},
	anio: {type: Number, optional: true},

	materiaCarrera: {type: String, optional: true},
	
	idDocente: {type: String,optional: true},
	nombreDocente: {type: String,optional: true},
	dniDocente: {type: String,optional: true},
	
	descripcion:{ type: String, optional: true, 
		autoform:{ type: "textarea", row: 10, class: "textarea"}
	}﻿,

	owner:{type: String, label: "Propietario",
		autoValue() {return this.userId},
		autoform: {type: "hidden"}
	},
	created: {type: Date,
		autoValue() {return new Date()},
		autoform: {type: "hidden"}
	},	
	
}));

Materias.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Materias.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});



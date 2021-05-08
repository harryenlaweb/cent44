import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Carreras = new Mongo.Collection('carreras');

export const CarrerasIndex = new EasySearch.Index({
	collection: Carreras,
	fields: ['nombre','codigo'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

Carreras.attachSchema(new SimpleSchema({
	
	nombre: {type: String, label: 'Nombre'},

	codigo: {	type: String, label: 'Código', optional: true },	

	descripcion:{ type: String, label: 'Descripción de la carrera', optional: true, 		
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

Carreras.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Carreras.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'carreras.remove'(carreraId){
		check(carreraId, String);
		Carreras.remove(carreraId);
	},	
});
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Mesas = new Mongo.Collection('mesas');

export const MesasIndex = new EasySearch.Index({
	collection: Mesas,
	fields: ['nombre','numero','fechaDesde','fechaHasta'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})

Mesas.attachSchema(new SimpleSchema({
	
	nombre: {type: String},
	idLlamado: {type: String},
	nombreLlamado: {type: String},
	numeroLlamado: {type: String},
	
	idMateria: {type: String},
	nombreMateria: {type: String},

	idCarrera: {type: String},
	nombreCarrera: {type: String},	

	idPresidente: {type: String},
	nombrePresidente: {type: String},
	idVocal1: {type: String},
	nombreVocal1: {type: String},
	idVocal2: {type: String},
	nombreVocal2: {type: String},	

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

Mesas.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Mesas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

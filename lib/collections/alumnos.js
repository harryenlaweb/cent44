import { CarrerasAlumno } from './carrerasAlumno';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const Alumnos = new Mongo.Collection('alumnos');

export const AlumnosIndex = new EasySearch.Index({
	collection: Alumnos,
	fields: ['nombreApellido','dni','email'],
	placeholder: "Search...",
	engine: new EasySearch.Minimongo(),
	defaultSearchOptions: {limit: 100}
})


Alumnos.attachSchema(new SimpleSchema({
	idUser : {type: String},
	nombreApellido: {type: String,	label: 'Nombre y apellido'},
	dni: {type: String,	label: 'DNI', optional: true},			
	legajo: {type: String, optional: true, label: 'Legajo'},
	//este campo es necesario para el autocomplete cuando se busca un paciente a la hora de reservar un turno
	nombreDni: {type: String, label: 'nombreDni', optional: true,
		autoform: {	type: "hidden" }
	},
	telefono: {	type: String, optional: true, label: 'Teléfono'},	

	direccion: {type: String, optional: true, label: 'Direccion'},

	localidad: {type: String, optional: true, label: 'Localiad'},

	provincia: {type: String, optional: true, label: 'Provincia'},

	email: {type: String, optional: true, label: 'Email'},	

	fechaNacimiento: {type: Date, optional: true, label: 'Fecha de nacimiento'},

	fechaIngreso: {type: Date, optional: true, label: 'Fecha de ingreso'},

	sexo: {type: String, label: '¿Es Hombre o Mujer?', optional: true}, 

	rol: {type: String, label: 'Rol', optional: true},

	miscarreras: { type: Array, optional: true, 
  		autoform: {type: "hidden"}   
  	},
  	'miscarreras.$': CarrerasAlumno,  

	descripcion:{ type: String, label: 'Descripción del alumno', optional: true,
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

Alumnos.allow({
	insert: function(userId, doc){
		return doc.owner === userId;
	},	
	update: function(userId, doc){
		return doc.owner === userId;
	}
});

Alumnos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Meteor.methods({
	'alumnos.remove'(alumnoId){
		check(alumnoId, String);
		Alumnos.remove(alumnoId);
	},	
})

Meteor.methods({
    'alumnos.removeCarrera'(memberID, subID) {        
        Alumnos.update(
            {_id: memberID},
            {$pull:{miscarreras: {_id: subID}}}, {getAutoValues: false});
    }
});




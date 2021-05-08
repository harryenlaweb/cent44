import { Router } from 'meteor/iron:router';
import { Meteor } from 'meteor/meteor';
import { Docentes, DocentesIndex } from '../lib/collections/docentes';
import { Alumnos, AlumnosIndex } from '../lib/collections/alumnos';
import { Carreras, CarrerasIndex } from '../lib/collections/carreras';
import { Materias, MateriasIndex } from '../lib/collections/materias';
import { Llamados, LlamadosIndex } from '../lib/collections/llamados';
import { Mesas, MesasIndex } from '../lib/collections/mesas';

Router.onBeforeAction(function () {  

  if (!Meteor.userId()) {    
    Router.go('home');    
  }        
  
  this.next();
  
});

Router.configure({
	layoutTemplate: 'baseLayout',
	waitOn:function() {
			 	return [				 					 	
				 	function() { return Meteor.subscribe('docentes'); },
				 	function() { return Meteor.subscribe('alumnos'); },
				 	function() { return Meteor.subscribe('carreras'); },
				 	function() { return Meteor.subscribe('materias'); },
				 	function() { return Meteor.subscribe('llamados'); },
				 	function() { return Meteor.subscribe('mesas'); },

			 	];			 	
	},	
});

Router.route('/', {
  name: 'home'
});

//-------------------------------SECCION DOCENTES------------------------
Router.route('/docentes',{
	name: 'docentes',
	data: {
		docentes(){
			return DocentesIndex;
		}
	}
})

Router.route('/docente_form', {
	name: 'docente_form'
})

//-------------------------------SECCION ALUMNOS------------------------
Router.route('/alumnos',{
	name: 'alumnos',
	data: {
		alumnos(){
			return AlumnosIndex;
		}
	}
})

Router.route('/alumno_form', {
	name: 'alumno_form'
})

//-------------------------------SECCION CARRERAS------------------------
Router.route('/carreras',{
	name: 'carreras',
	data: {
		carreras(){
			return CarrerasIndex;
		}
	}
})

Router.route('/carrera_form', {
	name: 'carrera_form'
})


//-------------------------------SECCION MATERIAS------------------------
Router.route('/materias',{
	name: 'materias',
	data: {
		materias(){
			return MateriasIndex;
		}
	}
})

Router.route('/materia_form', {
	name: 'materia_form'
})

//-------------------------------SECCION LLAMADOS------------------------
Router.route('/llamados',{
	name: 'llamados',
	data: {
		llamados(){
			return LlamadosIndex;
		}
	}
})

Router.route('/llamado_form', {
	name: 'llamado_form'
})

//-------------------------------SECCION MESAS------------------------
Router.route('/mesas',{
	name: 'mesas',
	data: {
		mesas(){
			return MesasIndex;
		}
	}
})

Router.route('/mesa_form', {
	name: 'mesa_form'
})
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);

export const CarrerasAlumno = new SimpleSchema({
	_id: {type: String},
	nombreCarrera: {type: String},	
});


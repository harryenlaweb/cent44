import { Carreras } from '../../../lib/collections/carreras';
import { Router } from 'meteor/iron:router';
import SimpleSchema from 'simpl-schema';
// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);



Template.carreraForm.helpers({
	formCollection() {
		return Carreras;
	}
})

Template.carreraForm.onCreated(function()
{
	AutoForm.addHooks(['carreraForm'],{
		onSuccess: function(operation, result, template)
		{
			Router.go('/carreras');
		}
	});
})

Template.carreraForm.events({  

    


});
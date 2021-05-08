Meteor.methods({
    'new_user':function(usuario){
      var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, ['admin'])) {
      id = Accounts.createUser({      
        email: usuario.email,
        password: usuario.dni,
        profile: {
          name:  usuario.name,          
        }
      });
    Roles.addUsersToRoles(id, usuario.cargo_roles);    
       return id;
    }
    else {
      throw new Meteor.Error(403, "No esta Autorizado a crear Usuarios");
    }
  }, 

  'changePass':function(userId, newPassword){
    Accounts.setPassword(userId, newPassword);
  }
  
  
  }); 
  
  
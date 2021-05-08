import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
Accounts.config({
forbidClientAccountCreation: false,
})

var contador=Meteor.users.find().count(); 
console.log(contador);
  if (contador===0){          
    id = Accounts.createUser({     
        email: "admin@cent44catriel.edu.ar",
        password: "rAcZESQhhTbR7ytkc",
        profile: {
          name:  "Admin User",
        }
      });    
    Roles.addUsersToRoles(id, "admin");
    console.log(id);
       return id;
    }
})

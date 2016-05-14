// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/prova');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  content: String,
  updated_at: Date
});


userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};
// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  next();
}); 

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('Utenti', userSchema);

// make this available to our users in our Node applications
module.exports = User;
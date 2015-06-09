"use strict";

var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    Schema = mongoose.Schema;    

var userSchema = new Schema({
  firstname: {
    type: String,
    required: "Please, enter your first name"
  },
  lastname: {
    type: String,
    required: "Please, enter your last name"
  },
  email: {
    type: String,
    required: "Please, enter your email"
  },
  password: {
    type: String,
    required: "Please, enter your password"
  },
  picture: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  crafts: []
});

userSchema.methods.hashPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

mongoose.model('Users', userSchema);






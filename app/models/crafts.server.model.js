"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var craftSchema = new Schema({
  title: {
    type: String,
    required: "Please, enter the title"
  },
  description: {
    type: String,
    required: "Please, enter the description"
  },
  category: {
    type: String
  },
  picture: {
    type: String
  },
  experts: [],
  applicants: []
});

mongoose.model('Crafts', craftSchema);

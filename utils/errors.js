//FILE ValueOutOfRangeError.js
"use strict";

//Utils module loaded
var util = require("util");

function DuplicateUserError(message) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  this.name = this.constructor.name; //set our function’s name as error name.
  this.message = message; //Concat and make a string.
}

// inherit from Error
util.inherits(DuplicateUserError, Error);

//Export the constructor function as the export of this module file.
module.exports = { DuplicateUserError };

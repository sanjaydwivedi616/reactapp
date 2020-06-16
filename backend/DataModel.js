const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true
  },
  DOB: String,
  gender: String,
  idProof: Number,
  edited: Boolean,
  address: {
    nationality: String,
    states: String,
    city: String,
    street: String,
    zipCode: Number
  }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  mobile: Number,
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

module.exports = mongoose.model("Users", userSchema);

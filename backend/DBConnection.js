const url = "mongodb://localhost:27017/userList";
const mongoose = require('mongoose');

const DBConnection = mongoose.connect(url).then(() => {
  console.log("Connected to database!");
}).catch(() => {
  console.log("Connection failed!");
});

module.exports = DBConnection;
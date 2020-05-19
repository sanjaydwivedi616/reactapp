const express = require("express");
const path = require("path")
const app = express();


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/users", require("./api"));
app.use("/login", require("./api"));

const port = 2000;

app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});
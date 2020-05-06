const express = require("express");
const path = require("path")
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/users", require("./api"));

const port = 2000;

app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});
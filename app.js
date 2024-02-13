const express = require("express");
const bodyParser = require("body-parser");

// create our express app
const app = express();

// cors
var cors = require("cors");
app.use(cors());

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// route
const routes = require("./Routes/Route");
app.use("/", routes);

//start server
app.listen(3000, () => {
  console.log("listeniing at port:3000");
});

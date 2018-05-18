const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

//////////////////////
// MIDDLEWARE SETUP //
//////////////////////
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

//////////////
// MONGOOSE //
//////////////
///////////////
// IF NEEDED //
///////////////
/*

const mongoose = require("mongoose");

// SETUP
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

// CONNECT
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost/test",
  error => {
    if (error) {
      console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
      throw error;
    }
  },
  {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
  }
);

*/

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Brad", lastName: "Traversy" },
    { id: 3, firstName: "Mary", lastName: "Swanson" }
  ];

  res.json(customers);
});

//////////////
// CATCHALL //
//////////////

// Send back React's index.html file for production
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

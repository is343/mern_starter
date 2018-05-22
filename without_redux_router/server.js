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
app.use(cors()); // allows any domain can make a request for the api

////////////////
// SET ROUTES //
////////////////

app.use("/api", userRoutes);

//////////////
// CATCHALL //
//////////////

// Send back React's index.html file for production
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

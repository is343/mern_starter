"use strict";
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// DB IMPORT
const db = require("./models");

// ROUTE IMPORTS
const userRoutes = require("./routes/user");

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

/////////////////////
// SOCKET IO SETUP //
/////////////////////

io.on("connection", socket => {
  console.log("Client connected", socket.id);

  socket.on("change color", color => {
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = process.env.PORT || 5000;
// socket-io requires server.listen
server.listen(port, () => console.log(`Listening on port ${port}`));

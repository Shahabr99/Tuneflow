const express = require("express");
const bodyParser = require("body-parser");
const {authenticateJWT} = require("./middlewares/auth")
const cors  = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const playlistRoutes = require("./routes/playlists");
const app = express();

// CORS to stop malicious request to backend
app.use(cors());

// To parse the JSON data from the request body
app.use(express.json());

// To parse incoming request bodies
app.use(bodyParser.json());


app.use(morgan("dev"));


app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/playlists", playlistRoutes);

module.exports = app;
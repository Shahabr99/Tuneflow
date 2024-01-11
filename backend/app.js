const express = require("express");
const app = express();
const cors  = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const playlistRoutes = require("./routes/playlists")


app.use(cors());
app.use(morgan('tiny'));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/playlists", playlistRoutes);


module.exports = app;
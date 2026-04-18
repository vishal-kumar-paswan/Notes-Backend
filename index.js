const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const path = require("path");
const PORT = 8000 || process.env.PORT;

// importing routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const noteRoutes = require("./routes/note.js");

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;

// const dbURL = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const databaseURL = process.env.MONGODB_URI || process.env.LOCAL_DATABASE;

// Connecting to Database
mongoose.connect(databaseURL).then(() => {
  console.log("-> DATABASE CONNECTED");
}).catch((error) => {
  console.log("-> FAILED TO CONNECT TO DATABASE");
  console.log(error);
});

// using body-parser, cookie-parser and cors
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
  "origin": "*",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
}
app.use(cors(corsOptions));

app.use(authRoutes);
app.use(userRoutes);
app.use(noteRoutes);

app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/pages/index.html')));
app.get("/test", (req, res) => res.status(200).json({"message": "API is working fine"}));

app.listen(PORT, () => {
  console.log(`-> app is running on port ${PORT}`);
})
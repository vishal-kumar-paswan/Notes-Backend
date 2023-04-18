const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const PORT = 8000 || process.env.PORT;

// importing routes
const noteRoutes = require("./routes/notes.js");

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;

const dbURL = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;

// Connecting to Database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DATABASE CONNECTED");
}).catch((error) => {
    console.log("FAILED TO CONNECT TO DATABASE");
    console.log(error);
});

// using body-parser and cors
app.use(bodyParser.json());

const corsOptions = {
    "origin": "*",
    "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
}

app.use(cors(corsOptions));

app.use("/", noteRoutes);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})
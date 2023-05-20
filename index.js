const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const PORT = 8000 || process.env.PORT;

// importing routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const noteRoutes = require("./routes/note.js");

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;

// const dbURL = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
const databaseURL = process.env.LOCAL_DATABASE || process.env.MONGODB_URI;

// Connecting to Database
mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
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

const rootDescription = `
<html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Notes Backend</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
      <h1>Notes Backend Server</h1>
      <h3>
        Developed by
        <a href="https://github.com/vishal-kumar-paswan">Vishal Kumar Paswan</a>
      </h3>
      <h3>
        Visit the
        <a href="https://github.com/vishal-kumar-paswan/Notes-Backend"
          >GitHub</a
        >
        repository for API reference
      </h3>
    </body>
  </html>
</html>

`

app.get("/", (req, res) => res.send(rootDescription));

app.listen(PORT, () => {
  console.log(`-> app is running on port ${PORT}`);
})
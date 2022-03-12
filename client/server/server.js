const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/authentication/authentication.route");
//1) CREATE APP FROM EXPRESS AND SET UP MONGOOSE CONFIG
//app
const app = express();

//as we connect, we got a promise back
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`DB connection error ${err}`));

//2 SETTING UP MIDDLEWARE
//middleware
// It simplifies the process of logging requests to your application. You might think of Morgan as a helper that generates request logs
app.use(morgan("dev"));
//helps communicate between front and back end, parse data under 2mb
app.use(bodyParser.json({ limit: "2mb" }));
//overcome CORS error
app.use(cors());

//routes MIDDLEWARE
// app.use("/api", authRoutes);

//this line below is for calling app.use for all the routes as the app starts, so we don;t have to call each route manually
fs.readdirSync("./routes").map((r) =>
  app.use(require(`./routes/${r}/${r}.route`))
);

//3 APP LISTENS TO PORT
//port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("listen to server running "));

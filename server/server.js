const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const helmet = require("helmet");
require("dotenv").config();

//initialize app
const app = express();

//Connect to MongoDb
const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("DB connected");
	} catch (err) {
		console.error("DB connection error", err);
		process.exit(1);
	}
};
connectToDatabase();

//Middleware
app.use(helmet()); //security headers
app.use(morgan("dev")); //logger for debugging
app.use(express.json()); //body parser for json
app.use(express.urlencoded({ extended: true })); //body parser for url encoded
app.use(cors());

//Load routes
const API_PREFIX = process.env.API_PREFIX || "/api";
fs.readdirSync("./routes").forEach((route) => {
	app.use(API_PREFIX, require(`./routes/${route}/${route}.route`));
});

//Serve static files
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

//Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ message: "Server went wrong!" });
});

//Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));

//Graceful shutdown
process.on("SIGINT", async () => {
	await mongoose.connection.close();
	console.log("DB disconnected due to app termination");
	process.exit(0);
});

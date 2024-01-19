const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("../api");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.options("*", cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "Hello World",
	});
});

app.use("/api/", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.use(middlewares.allowCors);

module.exports = app;

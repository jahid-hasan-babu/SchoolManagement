const express = require("express");

const app = express();
const router = require("./src/routes/api");
const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//security middleware
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

//Database
const mongoose = require("mongoose");

//Security middleware implement

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitizer());

//Rata limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Database connection

//api call

//Front end Tagging
app.use(express.static("client/dist"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.use("/api/v1", router);

module.exports = app;

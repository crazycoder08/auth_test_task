const express = require("express");
const createError = require("http-errors");
require("./helper/init_mongodb");
require("dotenv").config();

const app = express();

const AuthRouter = require("./routers/auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", AuthRouter);

app.get("/", async (req, res, next) => {
  res.send("Hello, from express!");
});

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(8000, () => {
  console.log("server started");
});

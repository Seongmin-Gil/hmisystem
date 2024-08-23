const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const router = require("./route");

const { errorHandler } = require("./util/errorHandler");

const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use("/back", router);
  app.get("/back/ping", (req, res) => {
    res.json({ message: "pong" });
  });
  app.use(errorHandler);

  return app;
};

module.exports = { createApp };

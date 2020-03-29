const Routes = require("./src/routes-v1/routes");

const express = require("express");
const cors = require("cors");

class AppController {
  constructor() {
    this.express = express();

    this.define();
  }

  define() {
    this.express.use(cors({ origin: "*" }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    this.express.use("/api/v1", new Routes().loadRoutes());
  }
}

module.exports = new AppController().express;

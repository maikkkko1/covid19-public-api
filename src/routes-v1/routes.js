const express = require("express");
const StatusController = require("../controllers/StatusController");

class Routes {
  constructor() {
    this.router = express.Router();

    this.definePublicRoutes();
  }

  loadRoutes() {
    return this.router;
  }

  definePublicRoutes() {
    this.router.get("/status", StatusController.getStatus.bind(this));

    this.router.get(
      "/status/:country",
      StatusController.getStatusByCountry.bind(this)
    );
  }
}

module.exports = Routes;

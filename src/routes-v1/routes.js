const express = require("express");
const StatusController = require("../controllers/StatusController");
const ScrapingController = require("../controllers/ScrapingController");

class Routes {
  constructor() {
    this.router = express.Router();

    this.definePublicRoutes();
  }

  loadRoutes() {
    return this.router;
  }

  definePublicRoutes() {
    this.router.get("/status", async (req, res) => {
      const b = await new ScrapingController().scrapPage();
      res.send(b);
    });
  }
}

module.exports = Routes;

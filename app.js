const Routes = require("./src/routes-v1/routes");
const ScrapingController = require("./src/controllers/ScrapingController");

const express = require("express");
const cors = require("cors");

class AppController {
  constructor() {
    this.express = express();

    this.runJob();

    this.define();
  }

  async runJob() {
    const interval = process.env.SCRAPING_INTERVAL_MINUTES || 1;

    setInterval(async () => {
      console.log("Scraping data...");

      await ScrapingController.scrapPage();
    }, interval * 60000);
  }

  define() {
    this.express.use(cors({ origin: "*" }));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    this.express.use("/api/v1", new Routes().loadRoutes());
  }
}

module.exports = new AppController().express;

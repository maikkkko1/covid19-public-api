"use strict";

const ScrapingController = require("./ScrapingController");

const fs = require("fs");

const status = require("../data/status.json");
const statusPath = "./src/data/status.json";

class StatusController {
  static async getStatus(req, res) {
    const data = await ScrapingController.scrapPage();

    await saveStatus(data);

    return res.status(200).send(status);
  }

  static async getStatusByCountry(req, res) {
    const data = await ScrapingController.scrapPage();

    await saveStatus(data);

    let country = req.params.country;
    country = country.replace(new RegExp(" ", "g"), "");
    country = country.toLowerCase();

    if (status) {
      const findCountry = status.status_by_country.find(
        v =>
          v.country.replace(new RegExp(" ", "g"), "").toLowerCase() == country
      );

      if (findCountry) {
        return res.status(200).send(findCountry);
      }

      return res.status(404).send({ error: "Country not found." });
    }

    return res.status(500).send({ error: "Internal error." });
  }
}

const saveStatus = data => {
  return new Promise(resolve => {
    fs.writeFile(statusPath, JSON.stringify(data), err => {
      if (err) throw err;

      resolve(true);
    });
  });
};

module.exports = StatusController;

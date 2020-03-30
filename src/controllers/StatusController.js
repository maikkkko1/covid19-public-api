"use strict";

const fs = require("fs");

const status = require("../data/status.json");
const statusPath = "./src/data/status.json";

class StatusController {
  static getStatus(req, res) {
    return res.status(200).send(status);
  }

  static getStatusByCountry(req, res) {
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

  static saveStatus(statusData) {
    this.writeData(statusPath, statusData);
  }

  static writeData(path, data) {
    fs.writeFile(path, JSON.stringify(data), err => {
      if (err) throw err;
    });
  }
}

module.exports = StatusController;

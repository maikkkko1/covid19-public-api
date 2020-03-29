"use strict";

const fs = require("fs");

const status = require("../data/status.json");
const statusPath = "./src/data/status.json";

class StatusController {
  static getStatus() {
    return status;
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

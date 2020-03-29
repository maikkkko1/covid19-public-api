"use strict";

const siteUrl = "https://www.worldometers.info/coronavirus/";
const axios = require("axios");
const cheerio = require("cheerio");

class ScrapingController {
  constructor() {
    this.status = {};
  }

  async scrapPage() {
    const $ = await this.fetchData();

    const totals = await this.scrapTotals($);
    const totalsCountries = await this.scrapCountries($);

    const closedCases = $(".number-table-main")
      .last()
      .text()
      .trim();

    const statusObject = {
      last_updated: new Date().toTimeString(),
      total_cases: totals[0],
      total_new_cases: totals[1],
      total_deaths: totals[2],
      total_new_deaths: totals[3],
      total_recovered: totals[4],
      total_active_cases: totals[5],
      total_closed_cases: closedCases,
      total_serious_or_critical: totals[6],
      first_case: "Jan 10",
      status_by_country: totalsCountries
    };

    return statusObject;
  }

  async scrapCountries($) {
    return new Promise(resolve => {
      const totals = $("tr");

      let result = [];

      totals.each(function() {
        let totalsColumns = $(this).find("td");

        let totals = [];

        totalsColumns.each(function() {
          const value = $(this)
            .text()
            .trim();

          totals.push(value);
        });

        result.push(totals);
      });

      const format = this.formatCountriesData(result);

      resolve(format);
    });
  }

  async scrapTotals($) {
    return new Promise(resolve => {
      const totals = $("tr.total_row").first();

      totals.each(function() {
        let totalsColumns = $(this).find("td");

        totalsColumns.splice(0, 1);

        let totals = [];

        totalsColumns.each(function() {
          const value = $(this)
            .text()
            .trim();

          if (value !== "" && value) {
            totals.push($(this).text());
          }
        });

        resolve(totals);
      });
    });
  }

  formatCountriesData(data) {
    let formattedData = [];

    data.map((countryData, countryIndex) => {
      countryData.map((value, index) => {
        if (!value || value == "") {
          data[countryIndex][index] = 0;
        }
      });
    });

    for (let i = 0; i < data.length; i++) {
      if (data[i].length > 0) {
        const v = data[i];

        const countryData = {
          country: v[0],
          total_cases: v[1],
          new_cases: v[2],
          total_deaths: v[3],
          new_deaths: v[4],
          total_recovered: v[5],
          active_cases: v[6],
          serious_or_critical: v[7],
          total_cases_per_1m_pop: v[8],
          deaths_per_1m_pop: v[9],
          first_case: v[10]
        };

        if (!formattedData.find(v => v.country == countryData.country)) {
          formattedData.push(countryData);
        }
      } else {
        data.splice(i, 1);
      }
    }

    formattedData.sort(function(a, b) {
      return parseInt(b.total_cases.replace(",", "")) >
        parseInt(a.total_cases.replace(",", ""))
        ? 1
        : -1;
    });

    formattedData.splice(0, 1);

    return formattedData;
  }

  async fetchData() {
    const result = await axios.get(siteUrl);

    return cheerio.load(result.data);
  }

  processElement(el) {
    return el.text().trim();
  }
}

module.exports = ScrapingController;

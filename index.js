const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://coinmarketcap.com/";

axios(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const result = [];

    $(".cmc-link", html).each(function () {
      const coin = $(this)
        .find("p.sc-1eb5slv-0", ".iworP")
        .attr("font-weight", "semibold")
        .text();
      if (coin) {
        result.push(coin);
      }
    });

    console.log(result);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`WebScraping in progress on PORT ${PORT}`));

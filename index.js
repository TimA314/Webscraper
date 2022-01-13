const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/us";

axios(url)
  .then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const result = [];

    $(".fc-item__container", html).each(function () {
      const content = $(this).text();
      const url = $(this).find("a").attr("href");
      result.push({
        content,
        url,
      });
    });
    console.log(result);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

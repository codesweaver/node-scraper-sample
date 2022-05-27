const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const baseURL = "https://www.rakuten.ne.jp/gold/toscana/side_menu_double.html";
const baseHtml = "div#menumain > dl > dd";

const getHtml = async () => {
    try {
        return await axios.get(baseURL);
    } catch(error) {
        console.error(error);
    }
};

getHtml().then((html) => {

    const $ = cheerio.load(html.data);
    const $categoryList = $(baseHtml);

    // let categories = [];
    $categoryList.each(function(index, elem){

        const title = $(this).find("a").text().replace(/(\([0-9,]*\))+/g, '').replace(/(（[0-9,]*）)+/g, '').trim();
        const link = $(this).find("a").attr("href");

        const content = title + "\t" + link + "\n";

        fs.appendFile("result.txt", content, error => {
            if (error) {
                console.error(error);
                return;
            }
        });
    });
});
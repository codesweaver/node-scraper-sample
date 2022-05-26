const axios = require("axios");
const cheerio = require("cheerio");

const baseURL = "https://onlydev.tistory.com/102";
const baseHtml = ".tt_category ul.category_list > li";

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

    let categories = [];
    $categoryList.each(function(index, elem){
        const data = {
            title: $(this).find(".link_item").text().replace(/[\n\t]/g, ''),
            link: $(this).find(".link_item").attr("href"),
            subCategory: [],
        }
    
        // subcategory check
        const subCategoryList = $(this).find(".sub_category_list li");
        subCategoryList.each(function(index, elem){
            const subData = {
                title: $(this).find(".link_sub_item").text().replace(/[\n\t]/g, ''),
                link: $(this).find(".link_sub_item").attr("href"),
            }
            data.subCategory.push(JSON.stringify(subData));
        });

        categories.push(data);
    });

    console.log(categories);
});
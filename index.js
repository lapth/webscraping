/**
 * Thực hiện trích xuất dữ liệu của các web site tĩnh với cheerio
 * Code sample này sẽ thực hiện việc trích xuất định nghĩa Web scraping từ 
 *   https://en.wikipedia.org/wiki/Web_scraping
 */

 var cheerio = require('cheerio');
 var request = require('request');

 const SOURCE_URL = 'https://en.wikipedia.org/wiki/Web_scraping';
 const ABOUT_SELECTOR = '#mw-content-text > div > p:nth-child(4)';

function extractData() {
    console.log("extractData >> START");
    
    request({
        method: 'GET',
        url: SOURCE_URL
    }, (err, res, body) => {
    
        if (err) return console.error(err);
    
        console.log("extractData >> Extracting data");

        var $ = cheerio.load(body);

        var title = $(ABOUT_SELECTOR).text().trim();

        console.log('Web scraping definition: ', title);
    });

    console.log("extractData >> END");
 }

 extractData();

/**
 * Thực hiện trích xuất dữ liệu của các web site động với jsdom
 * Code sample này sẽ thực hiện việc trích xuất dữ liệu để lấy title của bài đầu tiên ở
 *   https://www.computerworld.com/
 * 
 * Đây là web site động nên chúng ta cần chờ 1 lúc để dữ liệu được tải xong 
 */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const SOURCE_URL = 'https://www.computerworld.com/';
const SELECTOR = '#page-wrapper > section > section > div.homepage-top-stories > div > div.item.item-1.three > a > div > div > div > h3';

async function setTimeOut(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function extractData() {
    const options = {
        resources: 'usable',        // Include external js
        runScripts: "dangerously"   // Run javascript
    };
    console.log("extractData >> START");
    
    const sourcePage = await JSDOM.fromURL(SOURCE_URL, options); // Load and run JS
    const document = sourcePage.window.document;
    await setTimeOut(5000);

    const title = document.querySelector(SELECTOR).textContent;
    console.log('>>>>> Fisrt title: ', title);

    sourcePage.window.close();

    console.log("extractData >> END");
 }

extractData();

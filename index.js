/**
 * Thực hiện trích xuất dữ liệu của các web site động với Puppeteer
 * Code sample này sẽ thực hiện việc trích xuất dữ liệu để lấy title của bài đầu tiên ở
 *   https://www.computerworld.com/
 * 
 * Đây là web site động nên chúng ta cần chờ 1 lúc để dữ liệu được tải xong 
 */

const puppeteer = require('puppeteer');

const SOURCE_URL = 'https://vnexpress.net/';
const SELECTOR = 'body > section.section.section_topstory > div > div > div > div > div > div > ul > li:nth-child(2) > h3 > a';

let browser, page;

async function openBrowser(url) {
    browser = await puppeteer.launch({
        headless: true,
        "user-data-dir": "~/ChromDevSession"
    });
    page = await browser.newPage();
    const viewWidth = 1024;
    const viewHeight = 800;
    await page.setViewport({
        width: viewWidth,
        height: viewHeight,
        deviceScaleFactor: 1,
    });
    await page.goto(url);
    await page.waitFor(10000);
}

async function closeBrowser() {
    if (browser) {
        try {
            await browser.close();
        } catch (err) {
            logger.error(err);
        }
        browser = undefined;
        page = undefined;
    }
}

async function extractData() {
    console.log("extractData >> START");
    
    await openBrowser(SOURCE_URL);

    const title = await page.evaluate(selector => {
        return document.querySelector(selector).innerText;
    }, SELECTOR);

    console.log('>>>>> Fisrt title: ', title);

    await closeBrowser();

    console.log("extractData >> END");
 }

extractData();

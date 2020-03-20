const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        /*  headless: false */
    });
    const page = await browser.newPage();
    await page.goto("https://registration.swimming.ca/powerranking.aspx");

    const season = await page.evaluate(() => {
        return document.getElementById("ddl_season").children[0].toString();

    });
    console.log(season);

    // Temporary Test to see if it returns the correct number of events back (Will go back and add proper testing (assert Values etc))
    //console.log(eventsList);

    await browser.close();
})();
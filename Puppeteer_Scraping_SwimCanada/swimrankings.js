const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        //  headless: false,
        // slowMo: 300
    });
    const page = await browser.newPage();
    await page.goto('https://www.swimrankings.net/index.php?page=rankingDetail&clubId=72542&gender=1&season=2008&course=LCM&agegroup=X_X&stroke=1');


    const strokes = await page.evaluate(() => {
        let strokes = [];
        for (stroke in document.getElementsByName('stroke')[0].getElementsByTagName('option')) {
            strokes.push(stroke)
        }
        // * For the dropdown the elements at bottom are not needed for the dataset collection 
        return strokes.slice(0, 7);
    })
    // console.log(strokes);

    await browser.close();
})();
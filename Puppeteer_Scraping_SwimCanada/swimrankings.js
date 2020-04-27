const puppeteer = require('puppeteer');
const fs = require('fs');
var https = require('https');

(async () => {
    const browser = await puppeteer.launch({
        //headless: false,
        // slowMo: 300
    });

    const page = await browser.newPage();
    await page.goto('https://www.swimrankings.net/index.php?page=rankingDetail&clubId=72542&gender=1&season=2008&course=LCM&agegroup=X_X&stroke=1');

    // * Helper methods used for scrapping the forms drop down options for data collection
    const strokes = await page.evaluate(() => {
        let strokes = [];
        for (stroke of document.getElementsByName('stroke')[0].children) {
            strokes.push({
                'strokeValue': stroke.value,
                'strokeName': stroke.innerHTML
            })
        }
        // * For the dropdown the elements at bottom are not needed for the dataset collection
        return strokes.slice(0, 7);
    });
    console.log(strokes);

    const genders = await page.evaluate(() => {
        let genders = [];
        for (gender of document.getElementsByName('gender')[0].children) {
            genders.push({
                'genderValue': gender.value,
                'genderName': gender.innerHTML
            }
            )
        }
        return genders.slice(0, 2);
    });
    //console.log(gender);

    const courses = await page.evaluate(() => {
        let courses = [];
        for (course of document.getElementsByName('course')[0].children) {
            courses.push({
                'courseValue': course.value,
                'courseName': course.innerHTML
            });
        }
        return courses.slice(0, 2);
    });
    //console.log(courses);

    const swimmingSeason = await page.evaluate(() => {
        var seasons = [];
        for (year of document.getElementsByName('season')[0].children) {
            seasons.push({
                'seasonValue': year.value,
                'seasonName': year.innerText
            });
        }
        return seasons;
    });

    const download = (url) => {
        let parseURL = url.split('?');
        // * Takes the query strings from the url path and turns it into a set
        let queryStrings = new URLSearchParams(parseURL[1]);
        queryStrings.set('gender', 'F');
        queryStrings.append('stroke', '1')
        console.log(queryStrings);
        https.get(parseURL[0] + '?' + queryStrings.toString(), (res) => {
            let file = fs.createWriteStream('./' + queryStrings.toString() + '.xls')
            res.on('data', (d) => {
                file.write(d)
            })
            res.on('end', () => {
                console.log('File: ' + queryStrings.toString());
            });
        })
    }


    let link = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us';
    https://www.swimrankings.net/services/RankingXls/ranking.xls?club=72542&gender=M&season=2019-2020&agegroup=X_X&course=SCM&language=us&points=fina_2019&stroke=1
    let link2 = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us&gender=M&agegroup=X_X';

    // TODO "QUERYSTRING" PARAMETERS find all combinations and query strings given on the site then can go back and do requests from site
    // * QUERYSTRINGS can be viewed from "inspect -> network -> params " 
    // TODO (REVERSE ENGINEER CUSTOM FORM COLLECTION)  ----  https://www.swimrankings.net/services/RankingXls/ranking.xls?stroke=10&clubId=72542&course=SCM&gender=2&fromDMY=01.01.2020&untilDMY=31.12.2020&agemin=10&agemax=18&count=250

    download(link);
    await browser.close();
})();


// * WILL PARSE THE URL INSTEAD OF USING THE INTERNALS and site navigation with puppeteer
/*
let link = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us';
let url2 = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=F&agegroup=X_X&course=LCM&season=2010&clubId=72542&Points=fina_2019&Language=us'
let x = 'https://www.swimrankings.net/index.php?page=rankingDetail&clubId=72542&gender=2&season=2009&course=LCM&agegroup=X_X&stroke=1'
let dest = './'

 */
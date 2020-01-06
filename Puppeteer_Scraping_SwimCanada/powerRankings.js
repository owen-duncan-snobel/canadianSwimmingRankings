// Seperate logic into different files (import the events into the main logic etc)
const fs = require('fs');
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        //  headless: false
    });
    const page = await browser.newPage();
    await page.goto("https://registration.swimming.ca/powerranking.aspx");

    // ALL THE ARRAY BUILDERS OF OPTIONS OF WHAT TO SCRAPE
    // Store all the eventLists values in an array
    const eventsList = await page.evaluate(() => {
        var events = [];
        for (option of document.querySelector("#ddl_event").children) {
            events.push({
                // Event Value refers to in the document the id that is associated with the event they aren't in exact order
                "eventValue": option.value,
                "eventName": option.innerText
            });
        }
        // FIRST ELEMENT IS NOT NEEDED SO IT IS REMOVED FROM ARRAY
        var removeFirst = events.shift();
        return events;
    })
    //  console.log(eventsList);

    // Selects the age range from the Gender that is chosen to query from (Select an age, then will collect data for all events)
    // NEED TO ADD THE LOGIC TO SELECT FROM ALL KEY AGE RANGES  
    const ageFrom = await page.evaluate(() => {
        var ageArr = [];
        for (ages of document.querySelector("#ddl_agefrom").children) {
            ageArr.push(ages.value);
        }
        return ageArr;
    });
    // console.log(ageFrom);

    const ageTo = await page.evaluate(() => {
        var ageArr = [];
        for (ages of document.querySelector("#ddl_ageto").children) {
            ageArr.push(ages.value);
        }
        return ageArr;
    })
    //  console.log(ageTo);

    const gend = await page.evaluate(() => {
        var genders = [];
        for (g of document.querySelector("#ddl_gender").children) {
            genders.push({
                "genderValue": g.value,
                "gender": g.innerText
            });
        }
        let removeFirst = genders.shift();
        return genders;
    });
    //console.log(gend);

    // selects all events and displays the prompts (based on other parameters in search)

    // FOR KIDS UNDER 13 there is races that have never been swam by them 400 medley,
    // 800 etc so may to trends for only 13 and above so that all swim data is present


    // Male == 1 , Female == 0


    // ALL THE LOGIC FOR GETTING THE EVENTS FOR THE SPECIFIED AGE RANGE AND GENDER FOLDER
    // will eventually change it to a form that the user can specify

    // Need to go back and organize the variable names and proper local and global scoping of variables
    // aka g in gend, gender, genders ... more meaningful names 

    const makeDataDirectory = await fs.mkdir("swimmerData", function (err, result) {
        if (err) console.log("Couldn't make directory that stores the csv files, aka(swimmerData/)");
    });
    for (g in gend) {
        var count = 0;
        let lastData = '';
        await page.select("#ddl_agefrom", ageFrom[8]);
        await page.select("#ddl_ageto", ageTo[7]);
        await page.select("#ddl_gender", gend[g].genderValue)
        const dir = await fs.mkdir("swimmerData/" + gend[g].gender + '_' + ageFrom[8] + "_Events" + "/", function (err, result) {
            if (err) console.log("couldn't make the directory");
        });
        for (event in eventsList) {
            // should be nested for loop selects age then gets all events and genders
            const path = "swimmerData/" + gend[g].gender + '_' + ageFrom[8] + "_Events" + "/";
            await page.select("#ddl_event", eventsList[count].eventValue);
            await page.click("#btnShow");
            // IF you dont wait for the selector it moves to fast and will not 
            // display elements (Learned the hard way 4 hours....)
            // Need to turn the table into an object
            await page.waitForSelector("table");
            const data = await (await page.$$eval("tr", el => el.map(n => n.innerText.replace(/\t/g, '|'))));
            if (lastData == data.join('')) {
                console.log("Does not have data for event: " + eventsList[count].eventName + "," + gend[g].gender + "," + ageFrom[8]);
            } else {
                const events = await fs.writeFile(path + gend[g].gender + "_" + eventsList[count].eventName.split(' ').join('_') + '_' + ageFrom[8] + '.csv', data.join('\n'), function (err, result) {
                    if (err) console.log('error', err);
                });
            }
            lastData = data.join('');
            count++;
        }
    }
    //const divsCounts = await page.$$('tr', tr => tr.innerText);
    //console.log(divsCounts);


    const men = await page.evaluate(() => {
        return 0;
    })

    const woman = await page.evaluate(() => {

    })
    await browser.close();
})();


/* 
    Need to seperate the consts into another folder and import them as constants,
    The Gender selectors, Age from and Age to, Event values / all Events
    (That way when it is making request calls it only downloads the events one time / will store
        gender locations and event values on the server. )
 
    ALSO NEED TO SPECIFY SHORT VS LONG COURSE DEPENDING ON THE SEASON

*/
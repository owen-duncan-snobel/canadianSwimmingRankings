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
    // Stores all the Events values in an array
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
    //console.log(eventsList);

    // Selects the age range from the Gender that is chosen to query from (Select an age, then will collect data for all events)
    // ALSO ONLY CURRENTLY SELECTS FROM LONG COURSE
    const ageFrom = await page.evaluate(() => {
        var ageArr = [];
        for (ages of document.querySelector("#ddl_agefrom").children) {
            ageArr.push(ages.value);
        }
        let removeDefault = ageArr.shift();
        return ageArr;
    });
    // console.log(ageFrom);

    const ageTo = await page.evaluate(() => {
        var ageArr = [];
        for (ages of document.querySelector("#ddl_ageto").children) {
            ageArr.push(ages.value);
        }
        let removeDefault = ageArr.shift();
        return ageArr;
    })
    //  console.log(ageTo);

    const genders = await page.evaluate(() => {
        var gendersArr = [];
        for (g of document.querySelector("#ddl_gender").children) {
            gendersArr.push({
                "genderValue": g.value,
                "gender": g.innerText
            });
        }
        let removeFirst = gendersArr.shift();
        // Will need to take this function and write all to json then import json and get properties for json
        // console.log(JSON.stringify(genders));
        return gendersArr;
    });
    // console.log(genders);


    // selects all events and displays the prompts (based on other parameters in search)
    // ALL THE LOGIC FOR GETTING THE EVENTS FOR THE SPECIFIED AGE RANGE AND GENDER FOLDER
    // will eventually change it to a form that the user can specify

    // Need to go back and organize the variable names and proper local and global scoping of variables
    // aka g in gend, gender, genders ... more meaningful names 

    const makeDirectoryForCSV = await fs.mkdir("swimmerData", function (err, result) {
        if (err) console.log("Couldn't make directory that stores the csv files, aka(swimmerData/)");
    });

    // For Short Course OR Long Course Selection will need to either scrape both (time consuming, or base it off typical months)

    // ----------- SHORT COURSE OR LONG COURSE SELECTION --------------
    await page.select("#ddl_course", "1");
    // ADD FUNCTION FOR COURSE SELECTION
    for (gender in genders) {
        // Will only run once a week for events and csv collection
        // TIME COMPLEXITY FOR G DOES NOT MAKE IT x^3 , only two genders so it is (2 * x^2) slightly faster
        // NEED TO RENAME LOGIC FOR SELECTING ALL AGES / UNDER 10 / OVER 18
        var ageI = 0;
        for (age in ageFrom) {
            if (age == 0) {
                ageI = 0;
            } else if (ageI == ageFrom.length - 2) {
                ageI = age;
            } else {
                ageI = age - 1;
            }

            // NEED TO ADD THE SELECTION FOR LONG COURSE AND SHORT COURSE, Generally only run short course
            // ALSO NEED TO ADD FOR YEAR SELECTIONS TO COLLECT THE BACK CATALOGUE
            await page.select("#ddl_agefrom", ageFrom[age]);
            await page.select("#ddl_ageto", ageTo[ageI]);
            await page.select("#ddl_gender", genders[gender].genderValue)
            const dir = await fs.mkdir("swimmerData/" + genders[gender].gender + '_' + ageFrom[age] + "_Events" + "/", function (err, result) {
                if (err) console.log("couldn't make the directory");
            });
            var count = 0;
            let lastData = '';
            for (event in eventsList) {
                // should be nested for loop selects age then gets all events and genders
                const path = "swimmerData/" + genders[gender].gender + '_' + ageFrom[age] + "_Events" + "/";
                await page.select("#ddl_event", eventsList[count].eventValue);
                await page.click("#btnShow");
                await page.waitFor(500)
                // IF you dont wait for the selector it moves to fast and will not 
                // display elements (Learned the hard way 4 hours....)
                // Need to turn the table into an object
                await page.waitForSelector("table");
                const data = await (await page.$$eval("tr", el => el.map(n => n.innerText.replace(/\t/g, '|'))));
                if (lastData == data.join('')) {
                    console.log("Does not have data for event: " + eventsList[count].eventName + "," + genders[gender].gender + "," + ageFrom[age]);
                } else {
                    const events = await fs.writeFile(path + genders[gender].gender + "_" + eventsList[count].eventName.split(' ').join('_') + '_' + ageFrom[age] + '.csv', data.join('\n'), function (err) {
                        if (err) console.log('error', err);
                    });
                }
                lastData = data.join('');
                count++;
            }
            ageI = 0;
        }
    }
    await browser.close();
})();


/* 
    Need to seperate the consts into another folder and import them as constants,
    The Gender selectors, Age from and Age to, Event values / all Events
    (That way when it is making request calls it only downloads the events one time / will store
        gender locations and event values on the server. )
 
    ALSO NEED TO SPECIFY SHORT VS LONG COURSE DEPENDING ON THE SEASON

*/
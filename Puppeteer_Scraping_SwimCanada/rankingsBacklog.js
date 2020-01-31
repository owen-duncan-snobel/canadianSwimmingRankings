// Seperate logic into different files (import the events into the main logic etc)
const fs = require('fs');
const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        /*  headless: false */
    });
    const page = await browser.newPage();
    await page.goto("https://registration.swimming.ca/powerranking.aspx");

    // ALL THE ARRAY BUILDERS OF OPTIONS OF WHAT TO SCRAPE

    // ALL THE PREVIOUS YEARS TO COLLECT
    const swimmingSeason = await page.evaluate(() => {
        var season = [];
        for (year of document.querySelector("#ddl_season").children) {
            season.push({
                "seasonValue": year.value,
                "seasonYear": year.innerText
            });
        }
        var removeFirst = season.shift();
        return season;
    });

    // Stores all the Events values in an array
    const eventsList = await page.evaluate(() => {
        var events = [];
        for (option of document.querySelector("#ddl_event").children) {
            events.push({
                // Event Value refers to the id in the DOM that is associated with the event, they aren't stored in exact order
                // Event Name is the name of event (aka. 800 Free, 200 Breast..)
                "eventValue": option.value,
                "eventName": option.innerText
            });
        }
        // First Element is the default value from the dropdown list so it is not needed
        var removeFirst = events.shift();
        return events;
    })
    // Temporary Test to see if it returns the correct number of events back (Will go back and add proper testing (assert Values etc))
    //console.log(eventsList);


    // Selects all the age ranges in the dropdown list from to and from for later use 
    // ALSO ONLY CURRENTLY SELECTS FROM LONG COURSE
    const ageFrom = await page.evaluate(() => {
        var ageArr = [];
        for (ages of document.querySelector("#ddl_agefrom").children) {
            ageArr.push(ages.value);
        }
        // Removes the default element that was in the dropdown menu
        let removeDefault = ageArr.shift();
        return ageArr;
    });
    // console.log(ageFrom);

    const ageTo = await page.evaluate(() => {
        var ageArr = [];
        for (ages of document.querySelector("#ddl_ageto").children) {
            ageArr.push(ages.value);
        }
        // Removes the default element that was in the dropdown menu
        let removeDefault = ageArr.shift();
        return ageArr;
    })
    //  console.log(ageTo);

    const genders = await page.evaluate(() => {
        var gendersArr = [];
        for (g of document.querySelector("#ddl_gender").children) {
            gendersArr.push({
                "genderValue": g.value,
                "gender": g.innerText.split('-').join('_')
            });
        }
        let removeFirst = gendersArr.shift();
        return gendersArr;
    });
    // console.log(genders);


    // selects all events and displays the prompts (based on other parameters in search)
    // will eventually change it to a form that the user can specify

    // Need to go back and organize the variable names and proper local and global scoping of variables
    // aka g in gend, gender, genders ... more meaningful names 

    const makeDirectoryForCSV = await fs.mkdir("swimmerData", function (err, result) {
        if (err) console.log("Couldn't make directory that stores the csv files, aka(swimmerData/)");
    });

    // For Short Course OR Long Course Selection will need to either scrape both (time consuming, or base it off typical months of what season it is)

    // ----------- SHORT COURSE OR LONG COURSE SELECTION --------------
    // NEED TO ADD THE SELECTION FOR LONG COURSE AND SHORT COURSE, Generally only run short course [1 shortcourse, 2 longcourse]

    await page.select("#ddl_course", "1");

    // ADD FUNCTION FOR COURSE SELECTION

    for (year in swimmingSeason) {
        await page.select("#ddl_season", swimmingSeason[year].seasonValue);

        for (gender in genders) {
            // Will only run once a week for events and csv collection
            // TIME COMPLEXITY FOR G DOES NOT MAKE IT x^3 , only two genders so it is (2 * x^2) slightly faster
            // NEED TO RENAME LOGIC FOR SELECTING ALL AGES / UNDER 10 / OVER 18

            // NEED TO RETHINK THE LOGIC FOR THE TWO AND FROM AGES IT CURRENTLY DOESN'T DO THE OVER 18
            var ageI = 0;
            for (age in ageFrom) {
                if (age == 0) {
                    ageI = 0;
                } else if (ageI == ageFrom.length - 2) {
                    ageI = age;
                } else {
                    ageI = age - 1;
                }

                // ALSO NEED TO ADD FOR YEAR SELECTIONS TO COLLECT THE BACK CATALOGUE
                await page.select("#ddl_agefrom", ageFrom[age]);
                await page.select("#ddl_ageto", ageTo[ageI]);
                await page.select("#ddl_gender", genders[gender].genderValue);
                const date = new Date().toISOString().slice(0, 10);
                // NEED TO ADD VARIABLE FOR LONG COURSE OR SHORT COURSE AND YEAR ONCE I COLLECT ALL THE BACK LOGS
                const dir = await fs.mkdir("swimmerData/" + swimmingSeason[year].seasonYear.split('-').join('-') + "/Short_Course/" + date + "/" + genders[gender].gender + '_' + ageFrom[age] + "_Events" + "/", {
                    recursive: true
                },
                    function (err, result) {
                        if (err) console.log("couldn't make the directory");
                    });

                var count = 0;
                let lastData = '';
                for (event in eventsList) {
                    // should be nested for loop selects age then gets all events and genders
                    // NEED TO CHANGE THE COURSE TO A VARIABLE TO DO SEND TO CORRECT PATH
                    // NEED TO ADD CORRECT YEAR TO IT AS WELL
                    const path = "swimmerData/" + swimmingSeason[year].seasonYear.split('-').join('_') + "/Short_Course/" + date + "/" + genders[gender].gender + '_' + ageFrom[age] + "_Events" + "/";
                    await page.select("#ddl_event", eventsList[count].eventValue);
                    await page.click("#btnShow");
                    await page.waitFor(300)
                    // IF you dont wait for the selector it moves to fast and will not 
                    // display elements (Learned the hard way 4 hours....)
                    // Need to turn the table into an object
                    await page.waitForSelector("table");
                    const data = await (await page.$$eval("tr", el => el.map(n => n.innerText.replace(/\t/g, '|'))));
                    if (lastData == data.join('')) {
                        console.log("Does not have data for event: " + eventsList[count].eventName + "," + genders[gender].gender + "," + ageFrom[age]);
                    } else {
                        const jsonData = await Papa.parse(data.join('\n'), {
                            header: true
                        });
                        const events = await fs.writeFile(path + genders[gender].gender + '_' + ageFrom[age] + "_" + eventsList[count].eventName.split(' ').join('_') + '.json', JSON.stringify(jsonData), function (err) {
                            if (err) console.log('error', err);
                        });
                    }
                    lastData = data.join('');
                    count++;
                }
                ageI = 0;
            }
        }
    }

    await browser.close();
})();

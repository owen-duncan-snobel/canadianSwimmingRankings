const fs = require('fs');
const Papa = require('papaparse');
const puppeteer = require("puppeteer");

// * Validates that the command line arguments entered are valid for running file
let args = process.argv;
let course;

// * ensure that only one is passed (short or long course) 
if (args.length == 3) {
    switch (args[2].toLowerCase()) {
        case 'short_course':
            course = 'short_course';
            break;
        case 'long_course':
            course = 'long_course';
            break;
        default:
            throw 'Did not select a valid course (short_course or long_course)';
    }
} else {
    if (args.length < 3) throw 'Did not select a course (short_course or long_course)';
}

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
                "gender": g.innerText
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

    if (course == 'short_course') {
        course = '1';
    } else if (course == 'long_course') {
        course = '2';
    }

    // * Ensures it is selecting saving to correct directory (correct folder path and naming scheme)
    let coursepath;
    if (course == '1') {
        coursepath = 'Short_Course/';
    } else if (course == '2') {
        coursepath = 'Long_Course/'
    }

    // * Selects the correct course from the table
    await page.select("#ddl_course", course);
    // ADD FUNCTION FOR COURSE SELECTION
    for (year in swimmingSeason) {
        // * If it times out use this to jump into where it left off
        //    if (parseInt(swimmingSeason[year].seasonYear.split('-')[0]) < 2014) continue;

        await page.select("#ddl_season", swimmingSeason[year].seasonValue);
        for (gender in genders) {
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
                const dir = await fs.mkdir("swimmerData/" + coursepath, {
                    recursive: true
                },
                    function (err, result) {
                        if (err) console.log("couldn't make the directory");
                    });

                var count = 0;
                let lastData = '';
                for (event in eventsList) {
                    const path = "swimmerData/" + coursepath;
                    await page.select("#ddl_event", eventsList[count].eventValue);
                    await page.click("#btnShow");
                    await page.waitFor(300)
                    // IF you dont wait for the selector it moves to fast and will not 
                    // display elements (Learned the hard way 4 hours....)
                    await page.waitForSelector("table");
                    const data = await (await page.$$eval("tr", el => el.map(n => n.innerText.replace(/\t/g, '|'))));
                    if (lastData == data.join('')) {
                        console.log("Does not have data for event: " + swimmingSeason[year] + ' ' + eventsList[count].eventName + "," + genders[gender].gender + "," + ageFrom[age]);
                    } else {
                        // ! CONVERTS THE DATA OBJECT (Scrape Data) into a Js object that saved as a json file
                        const jsonData = await Papa.parse(data.join('\n'), {
                            header: true
                        });
                        const events = await fs.writeFile(path + swimmingSeason[year].seasonYear + '_' + genders[gender].gender + '_' + ageFrom[age] + "_" + eventsList[count].eventName.split(' ').join('_') + '.json', JSON.stringify(jsonData), function (err) {
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

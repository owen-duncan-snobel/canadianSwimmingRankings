const fetch = require('node-fetch');
const XLSX = require('xlsx')

let start = new Date()
let hrstart = process.hrtime()
let simulateTime = 5

// * Constants 

let ages = [
    'X_X', '11_11', '11_12', '12_12', '13_13', '13_14', '15_15',
    '15_16', '15_17', '16_16', '17_17', '17_18', '18_18', '18_24'
];

let seasons = [
    '2007-2008', '2008-2009', '2009-2010', '2010-2011', '2011-2012', '2012-2013',
    '2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018', '2018-2019',
    '2019-2020', '2020-2021', '2021-2022'
];
let clubs = ['72542'];

let courses = ['LCM', 'SCM'];
let events = [
    "50m Fr", "100m Fr", "200m Fr", "400m Fr", "800m Fr", "1500m Fr",
    "50m Bk", "100m Bk", "200m Bk", "50m Br", "100m Br", "200m Br",
    "50m Bu", "100m Bu", "200m Bu", "200m Me", "400m Me"
]
let genders = ['M', 'F'];

// * Urls will contain all the URLS to fetch from swimmingrankings.net to get all the excel files
// * File names will contain all the file names when we go to write files back they will keep corresponding name


let urls = [];
let fileNames = [];
let alldata = [];

// *  Creates an array of all possible names of files that you are able to fetch data from
for (let age of ages) {
    for (let season of seasons) {
        for (let course of courses) {
            for (let gender of genders) {
                let url = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?';
                let param = new URLSearchParams();
                param.append('gender', gender);
                param.append('agegroup', age);
                param.append('course', course);
                param.append('season', season);
                param.append('clubID', '72542');
                url += param.toString();
                urls.push(url);
                fileNames.push(url.split('?')[1] + '.xlsx');
            }
        }
    }
}

// * Will use filtering to allow them to find which are allowed
urls = urls.filter(url => url.includes('13_14') && url.includes('2018-2019') && url.includes('M') && url.includes('SCM'));
console.log(urls)

/*
// * Will fetch all files then return at once preserving order with Promise.all()
let jsonFiles = Promise.all(urls.map(url =>
    fetch(url, {
        method: "GET"
    })
        .then(response => {
            if (!response.ok) {
                console.log('Error: Could not display file ' + response.url)
                throw new Error("Unable to fetch file");
            }
            return response.arrayBuffer();
        })
        .then(buffer => {
            // * Converts The Array Buffer into a Workbook then saves the file
            let bookBuffer = new Uint8Array(buffer);
            let workbook = XLSX.read(bookBuffer, {
                type: "array"
            })
            let data = [];
            for (sheet in workbook.Sheets) {
                // * Might return it as csv and remove tops of each for database adding to allow faster queries of swimmers
                let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                // * removes place holder for top of file
                sheetData.shift();
                data.push(sheetData);
            }
            return data;
        })
))
    .then((allData) => {
        let arr = [];
        allData.forEach(sheet => {
            sheet.forEach(event => {
                event.forEach(swimmer => console.log(swimmer.__EMPTY_11));
            })
        })

        // * Function runtime
        setTimeout(function (argument) {
            let end = new Date() - start,
                hrend = process.hrtime(hrstart)
            console.info('Execution time: %dms', end)
            console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
        }, simulateTime)
    })
 */

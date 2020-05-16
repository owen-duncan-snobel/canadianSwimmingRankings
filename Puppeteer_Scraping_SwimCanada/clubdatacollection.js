const fs = require('fs');
const fetch = require('node-fetch');
const XLSX = require('xlsx')

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
/* let events = [
    "50m Fr", "100m Fr", "200m Fr", "400m Fr", "800m Fr", "1500m Fr",
    "50m Bk", "100m Bk", "200m Bk", "50m Br", "100m Br", "200m Br",
    "50m Bu", "100m Bu", "200m Bu", "200m Me", "400m Me"
] */
let genders = ['M', 'F'];

let urls = [];
let fileNames = [];
for (let age of ages) {
    //  for (let season of seasons) {
    for (let course of courses) {
        //   for (let gender of genders) {
        let url = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?';
        let param = new URLSearchParams();
        param.append('gender', 'M');
        param.append('agegroup', age);
        param.append('course', course);
        param.append('season', '2018-2019');
        param.append('clubID', '72542');
        url += param.toString();
        urls.push(url);
        fileNames.push(url.split('?')[1] + '.xlsx');
        //   }
    }
    //  }
}

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

            XLSX.writeFile(workbook, './testing/' + fileNames[0]);
            fileNames.shift();
        })
))


/* .then(el =>
    fs.writeFile('./working.json', el, (err) => {
        if (err) console.log('Error: Unable to write file');
    }))
 */
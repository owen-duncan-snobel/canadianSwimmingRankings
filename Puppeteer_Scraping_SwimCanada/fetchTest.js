const fetch = require('node-fetch');
const XLSX = require('xlsx');
const fs = require('fs');


fetch('https://www.swimrankings.net/services/RankingXls/ranking.xls?gender=M&agegroup=X_X&course=LCM&season=2008&clubId=72542&Points=fina_2019&Language=us')
    .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.arrayBuffer();
    })
    .then((arrayBuffer) => {
        // * Parse the stream data when it is recieved
        let data = new Uint8Array(arrayBuffer);
        let workbook = XLSX.read(data, {
            type: 'array',

        });
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];

        let JSONWorkbook = XLSX.utils.sheet_to_csv(worksheet)
        console.log(JSONWorkbook)
        return JSONWorkbook;
    })
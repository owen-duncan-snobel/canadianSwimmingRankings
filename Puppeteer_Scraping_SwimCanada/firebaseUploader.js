var fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("../../canadian-swimming-ranks-firebase-adminsdk-7x0t5-f65824ad6d");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://canadian-swimming-rankings.firebaseio.com",
    storageBucket: "canadian-swimming-ranks.appspot.com/"
});

var bucket = admin.storage().bucket().makePublic()

function addBackLogFiles() {

    let files = fs.readdir('./swimmerData/Short_Course/', function (err, data) {
        if (err) console.log("Couldn't read the directory files");
        var count = 0;
        for (file in data) {
            if (count == 20) break;
            var options = {
                destination: "" + data[file],
                predefinedAcl: 'publicRead'
            }
            bucket.upload('./swimmerData/Short_Course/' + data[file], options, function (err, file) {
                if (err) console.log('ERROR: ')
            })
            count += 1;
        }
    })
}


/*
let x = bucket.file('2007-2008_Female_0_50_Back.json');
let y = admin.storage().getFiles();
console.log(y)
/* let fileName = '2007-2008_Female_0_50_Back.json'
let localFile = './WorkingCucks.json'
bucket.file('2007-2008_Female_0_50_Back.json').createReadStream().on('error', function (err) { })
    .on('response', function (response) {
        // Server connected and responded with the specified status and headers.
    })
    .on('end', function () {

    })
    .pipe(fs.createWriteStream(localFile))
*/
/*.then(function (x) {
    console.log(JSON.parse(x))
}) */
//console.log(bucket.file('./Short_Course/2007-2008_Female_0_100_Back.json'))
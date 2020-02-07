var fs = require('fs');
var admin = require("firebase-admin");
var serviceAccount = require("../../canadian-swimming-ranks-firebase-adminsdk-7x0t5-f65824ad6d");

// Initialize the app with the credentials for the storage and bucket from Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://canadian-swimming-rankings.firebaseio.com",
    storageBucket: "canadian-swimming-ranks.appspot.com/"
});

const bucket = admin.storage().bucket()


// ! Makes the Bucket Public (Needed for doing calls for the react app to the Storage)
function makeBucketPublic(bucket) {
    bucket.makePublic();
}


// ? Format the CSV Files and Header for the CSV Files

fs.appendFileSync('./FEMALE_SIGNED_URLS.csv', 'File Name\tSIGNED URL\n', function (err) {
    if (err) console.log('ERROR: Unable to write SIGNED URLS to JSON');
})
fs.appendFileSync('./MALE_SIGNED_URLS.csv', 'File Name\tSIGNED URL\n', function (err) {
    if (err) console.log('ERROR: Unable to write SIGNED URLS to JSON');
})

/** 
 * ! Function for collecting the backloged data that is scraped in 'powerRanking.js' & 'rankingsBacklog.js'
 * ! and adds the data to the Firebase storage
*/

function addFilesToStorage() {
    // * Reads the Directory that contins the files and itterates through the folder and uploads each file to Storage

    let files = fs.readdir('./swimmerData/Short_Course/', function (err, data) {
        if (err) console.log("Couldn't read the directory files");

        for (file in data) {

            let options = {
                destination: "Short_Course/" + data[file],
                predefinedAcl: 'publicRead',
                public: true,
            }

            bucket.upload('./swimmerData/Short_Course/' + data[file], options, function (err, file) {
                if (err) console.log('ERROR: ')
                let url = file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then(function (x, file) {

                    // ! Filename for mapping of pairs of file and the SIGNED URL PATH
                    let fileNameForSignedUrl = x[0].toString().split('?')[0].split('/').pop().split('.')[0];
                    let gender = fileNameForSignedUrl.split('_')[1];


                    // ! FILE SIZE WHEN THEY WERE ALL IN ONE HIT MAX FILE LENGTH
                    if (gender == "Male") {
                        let obj = fileNameForSignedUrl.toString() + '\t' + x[0];
                        fs.appendFileSync('./MALE_SIGNED_URLS.csv', obj + '\n', function (err) {
                            if (err) console.log('ERROR: Unable to write SIGNED URLS to JSON');
                        })
                    }

                    else {
                        let obj = fileNameForSignedUrl.toString() + '\t' + x[0];
                        fs.appendFileSync('./FEMALE_SIGNED_URLS.csv', obj + '\n', function (err) {
                            if (err) console.log('ERROR: Unable to write SIGNED URLS to JSON');
                        })
                    }

                })
            })
        }


    })
}


addFilesToStorage();
// makeBucketPublic(bucket);
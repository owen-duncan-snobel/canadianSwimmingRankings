const { once } = require('events');
const { createReadStream } = require('fs');
const fs = require('fs');
const { createInterface } = require('readline');

const mapObject = new Map;
(async function processLineByLine() {
    try {
        const rl = createInterface({
            input: createReadStream('../SIGNED_URLS/MALE_SIGNED_URLS.csv'),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            let tempLine = line.split('\t');
            mapObject.set(tempLine[0], tempLine[1]);
        });

        await once(rl, 'close')

        // * Converts the Map to an Object which will be converted back to JSON, NEEDS TO GO TO OBJECT THEN TO JSON
        function strMapToObj(strMap) {
            let obj = Object.create(null);
            for (let [k, v] of strMap) {
                obj[k] = v;
            }
            return obj;
        }

        // * Converts the JSON Obj back to a Map to be used for look ups of the Needed SIGNED URL
        function objToStrMap(obj) {
            let strMap = new Map();
            for (let k of Object.keys(obj)) {
                strMap.set(k, obj[k]);
            }
            return strMap;
        }

        fs.writeFile('./SIGNED_URLS_OBJ.json', JSON.stringify(strMapToObj(mapObject)), function (err) {
            if (err) console.log('Unable to write Map object (Event Name and JSON Link) to file');
            return;
        });
    } catch (err) {

    }
})();
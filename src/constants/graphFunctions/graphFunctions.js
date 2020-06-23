import Rainbow from 'rainbowvis.js';


/**
 * Takes an array of numbers/strings/dates to find the number of occurences of each distinct element. It finds the number of occurences 
 * each element in the array and returns a Map (key,value) pairs. Key is the element, Value is the number of occurences.
 *
 * @param {Array} arr - Takes an array of numbers/strings/dates to find the number of occurences of each distinct element.
 * @returns {Map} Returns Map, where keys are the elements in the array and, value is the number of occurences of each element in the array.
 * 
 * @example 
 *  mostOccurences(['July','Aug','Sept','July','June']) --> Map(['July',2],['Aug',1],['Sept',1],['June',1])
 */
export const mostOccurences = (arr) => {
    try {
        let map = new Map();
        if (arr !== undefined && Array.isArray(arr) && arr.length >= 0) {
            while (arr.length !== 0) {
                if (!map.has(arr[0])) {
                    map.set(arr[0], 1);
                } else {
                    map.set(arr[0], map.get(arr[0]) + 1);
                }
                arr.shift();
            }
        }
        return map;
    } catch {
        console.log('Error: Data Array was empty, cannot calculate the occurences of null')
        return;
    }
};


/**
 * Converts the excel files Array of Swimmer Objects.__EMPTY_10 property (Meet Month: Stored in excel date value) 
 * Into a usable month to be viewed and compared with.
 * 
 * @param {object[]} meets - Takes an Array of Swimmer Objects to convert dates on.
 * @returns {object[]}   Where .__EMPTY_10 is now a useable month from JS Date. .getMonth() returns [0,1,2,3,4...,11] where 0 is January
 * 
 * @example 
 * 
 * [Object('__EMPTY_':..., '__EMPTY_10': 36949)] --> [Object('__EMPTY_1':..., '__EMPTY_10': 0)]
 *
 */
export const meetMonth = (meets) => {
    try {
        return meets.map(date => new Date(Math.floor(date.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).getMonth());
    } catch {
        console.log('Error: Unable to map the array');
        return;
    }
}

/**
 *   Takes the Array of Swimmer Objects and converts the months then finds the most occurences of the month data.
 * @param {object[]} data - Takes an Array of Swimmer Objects to convert dates and map.
 * @returns {Array} Returns an Array where index[0] is September and the values of occurences in September is the value at the index.
 */
export const peakDistribution = (data) => {
    try {
        // * Data for most common meet occurence month
        let months = Array(12).fill(0);
        let meets = mostOccurences(meetMonth(data));
        meets.forEach((value, key) => {
            months[key] = value
        });

        // * Shifts the Months so that is graphed about September-August
        for (let i = 0; i < 4; i++) {
            months.unshift(months.pop());
        }
        return months;
    } catch {
        console.log('Error: Unable to map the array');
        return;
    }
}

/**
 * Converts an Array of Numbers (times) to a date string in the format MM:SS.sss where the Time is the Average of the Array.
 * @param {Number[]} time - An Array of Numbers (Times)
 * @returns {string} datestring - Returns a readable date string based on the average of the array of times.
 */
export const averageTime = (time) => {
    try {
        let average = time.reduce((a, b) => a + b);
        return new Date(average / time.length).toISOString().substr(14, 8);
    }
    catch {
        console.log('Error: Empty Data Array')
    }
}

/**
 * Converts an Array of Numbers (times) to a date string in the format MM:SS.sss where the Time is the Median of the Array
 * @param {Number[]} time  An Array of Numbers (Times)
 * @param {Number[]} time  An Array of Numbers (Times)
 * @returns {string} datestring - Returns a readable date string based on the median of the array of times.
 */
export const medianTime = (time) => {
    try {
        let index = Math.floor(time.length / 2);
        let median;
        // * If the length % 2 === 0 (aka even number)
        if (time.length % 2 === 0 && time.length !== 0) {
            // * Minus one is needed for correct array index of even number centre points
            median = (time[index - 1] + time[index]) / 2;
        } else if (time.length % 2 === 1) {
            median = time[index];
        }
        return new Date(median).toISOString().substr(14, 8)
    } catch {
        console.log('Error: Empty Data Array')
    }
}

/**
 * Finds the Mode an Array of Numbers (times) and returns an object with the Mode Time and the number of occurences.
 * @param {Number[]} time An Array of Numbers (Times)
 * @returns {object} {mostCommonNumber} Returns The Most Common Number in Array
 * @returns {object} {maxCount} Returns the count of the Most Common Number
 */
export const modeTime = (time) => {
    try {
        // * Times is given in Milliseconds, and from lowest to highest. We will convert to seconds and round down to standardize mode to seconds
        let toModeSeconds = time.map(el => Math.floor(el / 1000));
        let modeOccurence = mostOccurences(toModeSeconds);

        // * Iterates through the map and finds the most occuring time
        let mostCommonNumber = NaN
        let maxCount = -1
        for (let [num, count] of modeOccurence.entries()) {
            if (count > maxCount) {
                maxCount = count
                mostCommonNumber = num
            }
        }
        return { mostCommonNumber, maxCount };
    } catch {
        console.log('Error: Empty Data Array')
    }
}

/**
 *  Takes an Array of Objects and returns an Array of all meets in each meet in the respective Objects.
 * @param {object[]} meetcitys - An Object Array of all entities in the respective excel sheet to for the Swimming Race. 
 * @returns {String[]}  
 */
export const meetCity = (meetcitys) => {
    if (Array.isArray(meetcitys)) {
        return meetcitys.map(meetcity => meetcity.__EMPTY_11);
    }
}

/**
 * 
 * @param {object[]} meets - An Object Array of all entities in the respective excel sheet to for the Swimming Race. 
 * @returns {String[]} meets
 */
export const meetName = (meets) => {
    if (Array.isArray(meets)) {
        return meets.map(meet => meet.__EMPTY_12);
    }
}


/**
 * Color Array takes input arrayLength (Number). It returns an array of gradient colors the same length as the input. 
 * Useful for creating a gradient of colours for a data set that will differ but match a color scheme / theme.
 * @param {Number} arrayLength  - The length of the Data Array denoting, how many colours along the gradient will be needed.
 * @returns {String[]} colorArray
 */
export const colorArray = (arrayLength) => {
    if (typeof arrayLength === 'number' && arrayLength >= 1) {
        // * Creates The Colors for the Component depending on how many distinct items there are in the array
        let myRainbow = new Rainbow();
        myRainbow.setSpectrum('#00aad8', '#ff6384')
        myRainbow.setNumberRange(1, arrayLength);
        let colorArray = [];
        for (let i = 0; i < arrayLength; i++) {
            colorArray.push('#' + myRainbow.colorAt(i));
        }
        return colorArray;
    }
}
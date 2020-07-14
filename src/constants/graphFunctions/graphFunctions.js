import Rainbow from 'rainbowvis.js';

/**
 * Takes an array of (numbers/strings/dates) and find the number of occurrences of each distinct element.
 * it returns a Map (key,value) pairs. Key is the element and Value is the number of occurrences.
 * @method
 * @param {Array} arr  Takes an array of numbers/strings/dates to find the number of Occurrences of each distinct element.
 * @returns {Map} Returns Map, where keys are the elements in the array and, value is the number of Occurrences of each element in the array.
 * @example 
 *  mostOccurrences(['July','Aug','Sept','July','June']) 
 * return  (
 *   Map(['July',2],['Aug',1],['Sept',1],['June',1])
 * )
 */
export const mostOccurrences = (arr) => {
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
        console.log('Error: Data Array was empty, cannot calculate the Occurrences of null')
        return;
    }
};


/**
 * Converts the Array of Swimmer Objects.__EMPTY_10 property (Meet Month is stored in excel date value),
 * into a usable month to be viewed and compared with against. Where the month is in [0,1,2,3,4,..11] (with 0 being january and so on)
 * @method
 * @param {object[]} meets Takes an Array of Swimmer Objects to convert dates on.
 * @returns {object[]}   Where .__EMPTY_10 is now a useable month from JS Date.
 * @example 
 * meetMonth([Object('__EMPTY_':..., '__EMPTY_10': 36949)]) // * __EMPTY_10 is in excel date value
 * 
 * return (
 * [Object('__EMPTY_1':..., '__EMPTY_10': 0)] // * __EMPTY_10 is now a single value contaning the month corresponding months
 * ) 
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
 *  Takes the Array of Swimmer Objects and converts the months to be aligned on the graph correctly. Also finds the most Occurrences of the month data.
 * @method
 * @param {object[]} data  Takes an Array of Swimmer Objects to convert dates and map.
 * @returns {Array} Returns an Array where index[0] is September and the values of Occurrences in September is the value at the index.
 * @example
 * peakDistribution(Object('__EMPTY_':..., '__EMPTY_10': 36949), Object('__EMPTY_':..., '__EMPTY_10': 36949), Object('__EMPTY_':..., '__EMPTY_10': 36949))
 * // 36949 -> January
 * return (
 *  // [sept,oct,nov,dec,jan,feb,mar,apr,may,june,july,aug]
 *  [0,0,0,0,3,0,0,0,0,0,0,0]
 * )
 */
export const peakDistribution = (data) => {
    try {
        // * Data for most common meet occurence month
        let months = Array(12).fill(0);
        let meets = mostOccurrences(meetMonth(data));
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
 * Converts an Array of Numbers (times) to a date string in the format MM:SS.sss where the Time is the Average Time of the Array Input.
 * @method
 * @param {Number[]} time An Array of Numbers (Times)
 * @returns {string} datestring - Returns a readable date string based on the average of the array of times.
 * @example
 *  averageTime([30000,25000,35000])
 *  return (
 *      00:30.00
 * )
 */
export const averageTime = (time) => {
    try {
        time.sort((a, b) => a - b);
        let average = time.reduce((a, b) => a + b);
        return new Date(average / time.length).toISOString().substr(14, 8);
    }
    catch {
        console.log('Error: Empty Data Array')
    }
}

/**
 * Converts an Array of Numbers (times) to a date string in the format MM:SS.sss where the Time is the Median of the Array
 * @method
 * @param {Number[]} time  An Array of Numbers (Times)
 * @param {Number[]} time  An Array of Numbers (Times)
 * @returns {string} datestring - Returns a readable date string based on the median of the array of times.
 * @example
 *  medianTime([30000,25000,35000])
 *  return (
 *      00:30.00
 * )
 */
export const medianTime = (time) => {
    try {
        // * Ensure data is in correct order to find median, must be sorted least to greatest
        time.sort((a, b) => a - b);
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
 * Finds the Mode an Array of Numbers (times) and returns an object with the Mode Time and the number of Occurrences.
 * @method
 * @param {Number[]} time An Array of Numbers (Times)
 * @returns {object} {mostCommonNumber} Returns The Most Common Number in Array
 * @returns {object} {maxCount} Returns the count of the Most Common Number
 * @example 
 *  modeTime([30000,25000,35000,30000])
 *  return (
 *  {
 *   "mostCommonNumber": 30,
 *   "maxCount": 2
    }
 * )
 */
export const modeTime = (time) => {
    try {
        // * Times is given in Milliseconds, and from lowest to highest. We will convert to seconds and round down to standardize mode to seconds
        let toModeSeconds = time.map(el => Math.floor(el / 1000));
        let modeOccurence = mostOccurrences(toModeSeconds);

        // * Iterates through the map and finds the most occuring time
        let mostCommonNumber = NaN;
        let maxCount = -1;
        for (let [num, count] of modeOccurence.entries()) {
            if (count > maxCount) {
                maxCount = count;
                mostCommonNumber = num;
            }
        }
        return { mostCommonNumber, maxCount };
    } catch {
        console.log('Error: Empty Data Array')
    }
}

/**
 *  Takes an Number[] times and calculates the Standard Deviation for the race times, returns a date string.
 *  Generally time is input in Milliseconds.
 * @method
 * @param {Number[]} time An Array of Numbers (times)
 * @return {string} standardDev returns the date string with the standard deviation for data.
 * @example 
 * // returns 00:03.30 (aka. 00:03.30 of standard deviation between time given in ms)
 * standardDeviation([ 9000, 2000, 5000, 4000, 12000, 7000]) 
 * return (
 *      00:03.30
 * )
 */
export const standardDeviation = (time) => {
    try {
        if (time === undefined || !Array.isArray(time) || time.length === 0) {
            return '';
        }
        let average = time.reduce((a, b) => a + b);
        let av = (average / time.length);
        let standardDev = time.map(t => Math.pow((t - av), 2));
        standardDev = Math.sqrt(standardDev.reduce((a, b) => a + b) / time.length);
        return new Date(standardDev).toISOString().substr(14, 8);
    } catch (e) {
        console.log(e);
    }
}

/**
 *  Takes an Array of Objects and returns an Array of all meets in each meet in the respective Objects.
 * @method
 * @param {object[]} meetcitys - An Object Array of all entities in the respective excel sheet to for the Swimming Race. 
 * @returns {String[]}  
 * @example
 *  meetCity(Object('__EMPTY_':..., '__EMPTY_11': 'Toronto'), Object('__EMPTY_':..., '__EMPTY_11': 'Winnipeg' ), Object('__EMPTY_':..., '__EMPTY_11': 'Toronto'))
 *  return (
 *      ['Toronto', 'Winnipeg', 'Toronto']
 * )
 */
export const meetCity = (meetcitys) => {
    if (Array.isArray(meetcitys)) {
        return meetcitys.map(meetcity => meetcity.__EMPTY_11);
    }
    return [];
}

/**
 *  Takes an Array of Objects and returns an Array of all meet names from each object
 * @method
 * @param {object[]} meets - An Object Array of all entities in the respective excel sheet to for the Swimming Race. 
 * @returns {String[]} meets
 * @example
 *  meetName(Object('__EMPTY_':..., '__EMPTY_12': 'Victor Davis'), Object('__EMPTY_':..., '__EMPTY_12': 'Dash For Cash' ), Object('__EMPTY_':..., '__EMPTY_12': 'HOBBS'))
 *  return (
 *      ['Victor Davis', 'Dash For Cash', 'HOBBS']
 * )
 */
export const meetName = (meets) => {
    if (Array.isArray(meets)) {
        return meets.map(meet => meet.__EMPTY_12);
    }
    return [];
}


/**
 * Color Array takes input arrayLength (Number). It returns an array of gradient colors the same length as the input. 
 * Useful for creating a gradient of colours for a data set that will differ but match a color scheme / theme.
 * @method
 * @param {Number} arrayLength  - The length of the Data Array denoting, how many colours along the gradient will be needed.
 * @returns {String[]} colorArray
 * @example
 *  colorArray(10)
 *  return (
 *      ["#00aad8", "#1aa3d0", "#339cc7", "#4d95bf", "#668eb6", "#8087ae", "#997fa6", "#b3789d", "#cc7195","#e66a8c"]
 * )
 */
export const colorArray = (arrayLength) => {
    if (typeof arrayLength === 'number' && arrayLength >= 1) {
        // * Creates The Colors for the Component depending on how many distinct items there are in the array
        let myRainbow = new Rainbow();
        myRainbow.setSpectrum('#00aad8', '#ff6384')
        myRainbow.setNumberRange(0, arrayLength);
        let colorArray = [];
        for (let i = 0; i < arrayLength; i++) {
            colorArray.push('#' + myRainbow.colorAt(i));
        }
        return colorArray;
    }
    return [];
}


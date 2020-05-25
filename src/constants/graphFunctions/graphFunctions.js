import Rainbow from 'rainbowvis.js';


// * Finds the element in an Array returns a Map (key,value) of the number of occurences of each distinctive element 
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
        return
    }
};

// * Converts time stored exceldate timeformat into a specific month
export const meetMonth = (meets) => {
    try {
        return meets.map(date => new Date(Math.floor(date.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).getMonth());
    } catch {
        console.log('Error: Unable to map the array');
        return;
    }
}

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

// * Average and Median Times
export const averageTime = (time) => {
    try {
        let average = time.reduce((a, b) => a + b);
        return new Date(average / time.length).toISOString().substr(14, 8);
    }
    catch {
        console.log('Error: Empty Data Array')
    }
}

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

export const meetCity = (meets) => {
    if (Array.isArray(meets)) {
        return meets.map(meet => meet.__EMPTY_11);
    }
}


// * Color Array Take input as a number, and returns an array of gradient colors
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
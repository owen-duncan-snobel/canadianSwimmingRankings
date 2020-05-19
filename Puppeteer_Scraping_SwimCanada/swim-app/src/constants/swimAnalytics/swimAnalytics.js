// * Finds the element in an Array returns a Map (key,value) of the number of occurences of each distinctive element 
export const mostOccurences = (list) => {
    let map = new Map();
    while (list.length !== 0) {
        if (!map.has(list[0])) {
            map.set(list[0], 1);
        } else {
            map.set(list[0], map.get(list[0]) + 1);
        }
        list.shift();
    }
    return map;
};

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
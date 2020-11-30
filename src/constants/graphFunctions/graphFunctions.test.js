/* import { mostOccurrences, standardDeviation } from './graphFunctions';

test('Most Occurrences Empty/Null/Undefined Tests', () => {
    expect(mostOccurrences([]).size).toBeUndefined;
    expect(mostOccurrences().size).toBe;
    expect(mostOccurrences({})).toBeUndefined;
});

test('Most Occurrences and Random Array Tests', () => {
    let arr1 = 'aaabbc'.split('');
    let arr1map = new Map;
    arr1map.set('a', 3);
    arr1map.set('b', 2);
    arr1map.set('c', 1);

    expect(mostOccurrences(arr1)).toEqual(arr1map);
    let total = 0;
    for (let key in arr1map.values()) {
        total += key
    }
    expect(total).toEqual(arr1.length);
});


test('Standard Deviation Tests', () => {
    // * Null / Empty Tests
    let arr1 = [];
    let arr2 = null;
    let arr3 = true;
    let arr4 = '';

    let arr5 = [9000, 2000, 5000, 4000, 12000, 7000]
    let arr6 = [9000, 2000, 5000, 4000, 12000, 7000, 8000, 11000, 9000, 3000, 7000, 4000, 12000, 5000, 4000, 10000, 9000, 6000, 9000, 4000];
    expect(standardDeviation(arr1)).toEqual('');
    expect(standardDeviation(arr2)).toEqual('');
    expect(standardDeviation(arr3)).toEqual('');
    expect(standardDeviation(arr4)).toEqual('');
    expect(standardDeviation(arr5)).toEqual('00:03.30');
    expect(standardDeviation(arr6)).toEqual('00:02.98');
})


 */
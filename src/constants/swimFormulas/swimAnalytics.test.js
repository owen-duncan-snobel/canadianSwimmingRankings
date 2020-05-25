import { mostOccurences } from './swimFormulas';

test('Most Occurences Empty/Null/Undefined Tests', () => {
    expect(mostOccurences([]).size).toBeUndefined;
    expect(mostOccurences().size).toBeUndefined;
    expect(mostOccurences({})).toBeUndefined;
});

test('Most Occurences and Random Array Tests', () => {
    let arr1 = 'aaabbc'.split('');
    let arr1map = new Map;
    arr1map.set('a', 3);
    arr1map.set('b', 2);
    arr1map.set('c', 1);

    expect(mostOccurences(arr1)).toEqual(arr1map);
    let total = 0;
    for (let key in arr1map.values()) {
        total += key
    }
    expect(total).toEqual(arr1.length);
});




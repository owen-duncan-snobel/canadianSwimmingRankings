import { mostOccurences, peakDistribution, averageTime, medianTime, modeTime } from './swimAnalytics';

test('Most Occurences Empty/Null/Undefined Tests', () => {
    expect(mostOccurences([]).size).toBeUndefined;
    expect(mostOccurences().size).toBeUndefined;
    expect(mostOccurences({})).toBeUndefined;
});

test('Most Occurences Random Array Tests', () => {
    let arr1 = 'aaabbc'.split('');
    let arr1map = new Map;
    arr1map.set('a', 3);
    arr1map.set('b', 2);
    arr1map.set('c', 1);
    expect(mostOccurences(arr1)).toEqual(arr1map);
});



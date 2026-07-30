import { HashMap } from "./hashmap.js"

const testMap = new HashMap() 

testMap.set('apple', 'red')
testMap.set('banana', 'yellow')
testMap.set('carrot', 'orange')
testMap.set('dog', 'brown')
testMap.set('elephant', 'gray')

test("has(key)", () => {
    expect(testMap.has("unicorn"))
    .toBeFalsy();

    expect(testMap.has("dog"))
    .toBeTruthy();
});

test("length()", () => {
    expect(testMap.length())
    .toBe(5);
});

test("keys()", () => {
    let sortedKeys = testMap.keys().toSorted();
    expect(sortedKeys)
    .toEqual(["apple", "banana", "carrot", "dog", "elephant"]);
});

test("values()", () => {
    let sortedValues = testMap.values().toSorted();
    expect(sortedValues)
    .toEqual(["brown", "gray", "orange", "red", "yellow"]);
});

test("entries()", () => {
    let sortedEntries = testMap.entries().toSorted();
    expect(sortedEntries)
    .toEqual([
        ["apple", "red"], 
        ["banana", "yellow"], 
        ["carrot", "orange"], 
        ["dog", "brown"], 
        ["elephant", "gray"]
    ]);
});


const bigMap = new HashMap();
bigMap.set("a", 1);
bigMap.set("b", 2);
bigMap.set("c", 3);
bigMap.set("d", 4);
bigMap.set("e", 5);
bigMap.set("f", 6);
bigMap.set("g", 7);
bigMap.set("h", 8);
bigMap.set("i", 9);
bigMap.set("j", 10);
bigMap.set("k", 11);
bigMap.set("l", 12);

test("grow()", () => {
    expect(bigMap.capacity)
    .toBe(16);

    bigMap.set("m", 13);

    expect(bigMap.capacity)
    .toBe(32);

    const sortedEntries = bigMap.entries().toSorted();
    expect(sortedEntries)
    .toEqual([
        ["a", 1],
        ["b", 2],
        ["c", 3],
        ["d", 4],
        ["e", 5],
        ["f", 6],
        ["g", 7],
        ["h", 8],
        ["i", 9],
        ["j", 10],
        ["k", 11],
        ["l", 12],
        ["m", 13],
    ]);
});

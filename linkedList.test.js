import { LinkedList, Node } from "./linkedList";

let list = new LinkedList();
list.append("Tom");
list.append("Sam");


test("prepend()", () => {
    list.prepend("Anne");
    expect(list.toString())
    .toBe("( Anne ) -> ( Tom ) -> ( Sam ) -> null");
});

test("append()", () => {
    list.append("Amy");
    expect(list.toString())
    .toBe("( Anne ) -> ( Tom ) -> ( Sam ) -> ( Amy ) -> null");
});

test("size()", () => {
    expect(list.size())
    .toBe(4);
});

test("heads()", () => {
    expect(list.heads())
    .toBe("Anne");
});

test("tail()", () => {
    expect(list.tail())
    .toBe("Amy");
});

test("at(index)", () => {
    expect(list.at(2))
    .toBe("Sam");
});

test("pop()", () => {
    expect(list.pop())
    .toBe("Anne");

    expect(list.toString())
    .toBe("( Tom ) -> ( Sam ) -> ( Amy ) -> null");
});

test("contains(value)", () => {
    expect(list.contains("Tom"))
    .toBe(true);
    
    expect(list.contains("Pete"))
    .toBe(false);
});

test("findIndex(value)", () => {
    expect(list.findIndex("Sam"))
    .toBe(1);
});

test("removeAt(index)", () => {
    list.removeAt(1);
    expect(list.toString())
    .toBe("( Tom ) -> ( Amy ) -> null");   
})


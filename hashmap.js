import LinkedList from "./linkedList.js";

class HashMap {

    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;

        // let buckets = new Array(16).fill(0);
        // buckets.forEach((bucket) => {
        //     bucket = new LinkedList();
        // });
        let buckets = [];
        for(let i=0; i<16; i++) {
            buckets.push(new LinkedList())
        }
        this.buckets = buckets;
    }


    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }
        
        return hashCode;
    }


    set(key, value) {
        const index = this.hash(key);
        console.log(`index: ${index}`);
        const obj = {};
        obj[key] = value;

        let list = this.buckets[index];
        if (list.head === null) {
            list.append(obj);
        }
        else {
            let overwritten = false;
            let tmp = list.head;
            while( tmp != null ) {
                let currentKey = Object.keys(tmp.value)[0]
                if(currentKey === key) {
                    tmp.value[key] = value;
                    overwritten = true;
                    break;
                }
                tmp = tmp.next;
            }
            
            if (!overwritten) {
                list.append(obj);
            }
        }
        console.log(list)
    }

    get(key) {
        const index = this.hash(key);
        let tmp = this.buckets[index].head;
        while (tmp != null) {
            if (tmp.value[key] != undefined) {
                return tmp.value[key];
            }
            tmp = tmp.next;
        }
        return null;
    }

    has(key) {
        if(this.get(key) === null) {
            return false;
        }
        else {
            return true;
        }
    }

    remove(key) {
        if (this.has(key)) {
            const index = this.hash(key);
            let list = this.buckets[index];
            let head = list.head;
            if (Object.keys(head.value)[0] === key) {
                head = head.next;
            }
            else {
                let tmp = head;
                while (tmp.next != null) {
                    if (Object.keys(tmp.next.value)[0] === key) {
                        tmp.next = tmp.next.next;
                        break;
                    }
                    else {
                        tmp = tmp.next;
                    }
                }
            }
            return true;
        }
        return false;
    }


    // Hier weitermachen
    length() {
        //returns the number of stored keys in the hash map
    }

    keys() {

    }
}


const test = new HashMap() 

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test)

console.log(test.remove("lion"));

console.log(test)

import { LinkedList } from "./linkedList.js";

export class HashMap {

    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;

        let buckets = [];
        for(let i=0; i<16; i++) {
            buckets.push(new LinkedList())
        }
        this.buckets = buckets;
    }

    /**
     * Takes a key and produces a hash code with it.
     */
    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }
        
        return hashCode;
    }

    /**
     * Takes two arguments: the first is a key, and the second
     * is a value that is assigned to this key. If a key
     * already exists, then the old value is overwritten.
     * If load factor is reached, the capacity gets doubled.
     */
    set(key, value) {
        const index = this.hash(key);
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

        // Check if map needs to grow
        const load = this.loadFactor * this.capacity;
        const entries = this.length();
        if (entries > load) {
            this.grow();
        }
    }

    /**
     * Takes one argument as a key and returns the
     * value that is assigned to this key. If a key
     * is not found, return null.
     */
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

    /**
     * Takes a key as an argument and returns true 
     * or false based on whether or not the key is 
     * in the hash map.
     */
    has(key) {
        if(this.get(key) === null) {
            return false;
        }
        else {
            return true;
        }
    }

    /**
     * Takes a key as an argument. If the given key is
     * in the hash map, it removes the entry with that
     * key and return returns true. If the key isn't in 
     * the hash map, it returns false.
     */
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

    /**
     * 
     * @returns @returns the number of stored keys in the hash map.
     */
    length() {
        let len = 0;
        this.buckets.forEach( (bucket) => {
            len += bucket.size();
        })
        return len;
    }

    /**
     * removes all entries in the hash map.
     */
    clear() {
        let buckets = [];
        for(let i=0; i<this.capacity; i++) {
            buckets.push(new LinkedList())
        }
        this.buckets = buckets;
    }

    /**
     * @returns an array containing all the keys inside the hash map.
     */
    keys() {
        let arr = [];
        this.buckets.forEach( (list) => {
            let tmp = list.head;
            while(tmp != null){
                arr.push(Object.keys(tmp.value)[0])
                tmp = tmp.next;
            }
        })
        return arr;
    }


    /**
     * @returns an array containing all the values.
     */
    values() {
        let keys = this.keys();
        let arr = [];
        keys.forEach((key) => {
            arr.push(this.get(key));
        });
        
        return arr;
    }

    /**
     * @returns an array that contains each key, value pair.
     */
    entries() {
        let keys = this.keys();
        let arr = [];
        keys.forEach((key) => {
            let val = this.get(key);
            arr.push([key, val]);
        });
        
        return arr;
    }

    /**
     * Helper method to double array size and 
     * rearrange entries.
     */
    grow() {
        const entries = this.entries();
        let len = this.buckets.length * 2;
        this.capacity = len;
        
        // Create new array and set every value again
        let buckets = [];
        for(let i=0; i<len; i++) {
            buckets.push(new LinkedList())
        }
        this.buckets = buckets;
        
        entries.forEach( (entry) => {
            let key = entry[0];
            let val = entry[1];
            this.set(key, val);
        })
    }
}



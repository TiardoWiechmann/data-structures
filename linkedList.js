

export class LinkedList {
    constructor() {
        this.head = null;
    }
    
    append(value) {
        if (this.head === null) {
            this.prepend(value);
        }
        else {
            let tmp = this.head;
            while(tmp.next != null) {
                tmp = tmp.next;
            }
            tmp.next = new Node(value, null);
        }
    }
    

    prepend(value) {
        this.head = new Node(value, this.head);
    }

    /**
     * 
     * @returns the total number of nodes in the list.
     */
    size() {
        let tmp = this.head;
        let i = 0;
        while(tmp != null) {
            tmp = tmp.next;
            i++;
        }
        return i;
    }

    heads() {
        if(this.head === null){
            return undefined;
        }
        return this.head.value;
    }

    tail() {
        if(this.head === null) {
            return undefined;
        }
        let tmp = this.head;
        while(tmp.next != null) {
            tmp = tmp.next;
        }
        return tmp.value;
    }

    at(index) {
        if(this.head === null) {
            return undefined;
        }
        let tmp = this.head; 
        let i = 0;
        for(i; i<index; i++) {
            tmp = tmp.next;
            if (tmp === null){
                return undefined;
            }
        }
        return tmp.value;
    }

    pop() {
        if (this.head === null) {
            return undefined;
        }
        const tmp = this.head;
        this.head = this.head.next;
        return tmp.value;
    }

    contains(value) {
        let tmp = this.head;
        while (tmp !== null) {
            if (tmp.value === value){
                return true;
            }
            tmp = tmp.next;
        }
        return false;
    }

    findIndex(value) {
        if(this.head === null) {
            return -1;
        }
        let tmp = this.head; 
        let i = 0;
        while (tmp !== null) {
            if (tmp.value === value) {
                return i;
            }
            tmp = tmp.next;
            i++;
        }
        return -1;
    }

    toString() {
        if (this.head === null) {
            return "";
        }
        let output = "";
        let tmp = this.head;
        while (tmp !== null) {
            output += `( ${tmp.value} ) -> `;
            tmp = tmp.next;
        }
        output += "null";
        return output;
    }

    removeAt(index) {
        if (this.head === null) {
            throw new Error("Cannot delete");
        }
        else if ( index < 0 || (index >= this.size())) {
            throw new RangeError("Index out of bounds!");
        }
        else if (index === 0) {
            this.head = this.head.next;
        }
        else {
            let tmp = this.head;
            for (let i=1; i<=index; i++) {
                if (i != index){
                    tmp = tmp.next;
                }
                else {
                    tmp.next = tmp.next.next;
                }
            }
        }
    }

    insertAt(index, ...values) {
        if (index < 0 || index >= this.size()) {
            throw new RangeError("Index out of bounds");
        }
        const vals = [...values];
        const list2 = new LinkedList();
        vals.forEach( (val) => {
            list2.append(val);
        })

        let tmp = this.head;
        for (let i=0; i<index-1; i++) {
            tmp = tmp.next;
        }
        
        let tmp2 = list2.head;
        while (tmp2.next != null) {
            tmp2 = tmp2.next;
        }
        let startList2 = list2.head;
        tmp2.next = tmp.next;   // rest of this gets appended to list2
        tmp.next = startList2;  // list2 gets appended to this
    }
}

class Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

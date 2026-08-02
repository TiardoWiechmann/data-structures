// Binary Search Trees

class Node {
    constructor(data, left=null, right=null) {
        this.data = data;
        this.left = left;
        this.right = right;
    } 
}

class Tree {
    constructor(array) {
        if (typeof array[0] === "number") {
            array.sort((a,b) => a - b);
        }
        else {
            array.sort();
        }
        const newArr = Tree.#removeDuplicates(array);
        this.root = Tree.#buildTree(newArr, 0, newArr.length-1);
    }

    static #removeDuplicates(sortedArr) {
        if(!sortedArr) {
            return [];
        }
        let newArr = [sortedArr[0]];
        for (let i=1; i<sortedArr.length; i++) {
            if (sortedArr[i-1] === sortedArr[i]){
                continue;
            }
            newArr.push(sortedArr[i]);
        }
        
        return newArr;
    }

    /**
     * Creates BST from sorted array
     * @param {*} array sorted and without duplicates
     * @returns root node of balanced binary tree
     */
    static #buildTree(array, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = Tree.#buildTree(array, start, mid-1);
        root.right = Tree.#buildTree(array, mid+1, end);

        return root;
    }

    /**
     * 
     * @returns true if the given value is in the tree; otherwise false. 
     */
    includes(value) {
        return Tree.#includes(this.root, value);
    }

    static #includes(root, value) {
        if (root === null) {
            return false;
        }
        if (root.data === value) {
            return true;
        }

        return Tree.#includes(root.left, value) || 
               Tree.#includes(root.right, value);
    }


    /**
     * Accepts a value and inserts a new node with that value into the tree 
     */
    insert(value) {
        this.root = Tree.#insert(this.root, value);
    }

    static #insert(root, value) {
        if(root === null) {
            return new Node(value);
        }
        else if(root.data < value) {
            root.right = Tree.#insert(root.right, value);
        }
        else if (value < root.data) {
            root.left = Tree.#insert(root.left, value);
        }
        return root;
    }


    /**
     * Accepts a value and removes it from the tree. 
     */
    deleteItem(value) {
        this.root = Tree.#deleteItem(this.root, value);
    }

    static #deleteItem(root, value) {
        if(root === null) {
            return root;
        }

        if (value < root.data) {
            root.left = Tree.#deleteItem(root.left, value);
        }
        else if (root.data < value) {
            root.right = Tree.#deleteItem(root.right, value)
        }
        // if root.data == value
        else {
            if(root.left === null) {
                return root.right;
            }
            else if(root.right === null) {
                return root.left;
            }
            else {
                const succ = Tree.#getSuccessor(root);
                root.data = succ.data;
                root.right = Tree.#deleteItem(root.right, succ.data);
            }
        }
        return root;
    }

    static #getSuccessor(curr){
        curr = curr.right;
        while(curr != null && curr.left != null) {
            curr = curr.left;
        }
        return curr;
    }


    /**
     * Accepts a callback function as its parameter. 
     * levelOrderForEach() should traverse the tree in 
     * breadth-first level order and call the callback 
     * on each value as it traverses, passing each value 
     * (not the nodes) as an argument.
     */
    levelOrderForEach(callback) {
        
    }



    /**
     * Visualizes BST
     */
    static prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null || node === undefined) {
          return;
        }
      
        Tree.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        Tree.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
      }
}


let arr = [1, 2, 2, 0, 5, 4];
const tree = new Tree(arr);
Tree.prettyPrint(tree.root);
console.log(tree.includes(1));
tree.insert(3);
Tree.prettyPrint(tree.root);
tree.deleteItem(tree.root, 2);
Tree.prettyPrint(tree.root);


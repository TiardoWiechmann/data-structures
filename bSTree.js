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
        const newArr = removeDuplicates(array);
        this.root = Tree.#buildTree(newArr, 0, newArr.length-1);
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
        console.log(root);
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


function removeDuplicates(sortedArr) {
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


let arr = [1, 2, 2, 0, 5, 4];
const tree = new Tree(arr);
Tree.prettyPrint(tree.root);
console.log(tree.includes(1));

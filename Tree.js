import Node from "./Node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(this.#prepareArray(array));
    }

    #prepareArray(array) {
        return array.filter((element, index) => array.indexOf(element) === index).sort((a, b) => a - b);
    }

    buildTree(array, start = 0, end = array.length - 1) {
        if (start > end) {
            return null;
        }
        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);

        root.left = this.buildTree(array, start, mid-1);
        root.right = this.buildTree(array, mid+1, end);

        return root;
    }

    insert(value, node = this.root) {
        if (node === null) return new Node(value);
        if (node.value === value) return null;

        if (node.value < value) {
            node.right = this.insert(value, node.right);
        }
        else if (node.value > value) {
            node.left = this.insert(value, node.left);
        }
        if(this.isBalanced()) this.rebalance();
        return node;
    }

    delete(value, node = this.root) {
        if (node == null) return node;

        if (node.value > value) node.left = this.delete(value, node.left);
        else if (node.value < value) node.right = this.delete(value, node.right);
        else {
            if (node.left == null) return node.right;
            else if (node.right == null) return node.left;

            node.value = this.#minValue(node.right);
            node.right = this.delete(node.value, node.right);
        }
        if(this.isBalanced()) this.rebalance();
        return node;
    }

    #minValue(node) {
        let minv = node.value;
        while (node.left != null) {
            minv = node.left.value;
            node = node.left;
        }
        return minv;
    }

    find(value, node = this.root) {
        if (node === null) return null;
        if (node.value === value) return node;
        if (node.value > value) return this.find(value, node.left);
        if (node.value < value) return this.find(value, node.right);
    }

    levelOrder(cb, root = this.root, ) {
        let result = [];
        const queue = [root];

        while (queue.length > 0) {
            let currentLevel = [];
            let levelSize = queue.length;

            while (levelSize--) {
                let currentNode = queue.shift();
                if (cb) cb(currentNode);
                currentLevel.push(currentNode);

                if (currentNode.left != null) queue.push(currentNode.left);
                if (currentNode.right != null) queue.push(currentNode.right);
            }

            result.push(currentLevel);
        }

        return result;
    }

    preOrder(cb, node = this.root) {
        if (node === null) return;
        cb(node);
        this.preOrder(cb, node.left);
        this.preOrder(cb, node.right);
    }

    postOrder(cb, node = this.root) {
        if (node === null) return;
        this.postOrder(cb, node.left);
        this.postOrder(cb, node.right);
        cb(node);
    }

    inOrder(cb, node = this.root) {
        if (node === null) return;
        this.inOrder(cb, node.left);
        cb(node);
        this.inOrder(cb, node.right);
    }

    height(node) {
        return this.levelOrder(null, node).length - 1;
    }

    depth(node, current = this.root, depth = 0) {
        if(current === null) return -1;

        if(node.value === current.value) return depth;
        else if (node.value < current.value) return this.depth(node, current.left, depth + 1);
        else if (node.value > current.value) return this.depth(node, current.right, depth + 1);
    }

    isBalanced() {
        const leftHeight = this.height(this.root.left);
        const rightHeight = this.height(this.root.right);
        return (Math.abs(leftHeight - rightHeight) === 1 || Math.abs(leftHeight - rightHeight) === 0) ? true : false;
    }

    rebalance() {
        const levelOrder = this.levelOrder();
        const array = [];
        for(let i = 0; i < levelOrder.length; i++) {
            for(let j = 0; j < levelOrder[i].length; j++) {
                array.push(levelOrder[i][j].value);
            }
        }
        this.root = this.buildTree(this.#prepareArray(array));
    }

    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
}

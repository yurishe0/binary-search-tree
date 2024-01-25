import Tree from "./Tree.js";

const populateArray = (numberOfElements = 10) => {
    const array = [];
    for(let i = 0; i < numberOfElements; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
};

const BST = new Tree(populateArray(15));
console.log(BST.isBalanced());

BST.levelOrder((e) => console.log(e));
console.log("______________________");
BST.preOrder((e) => console.log(e));
console.log("______________________");
BST.inOrder((e) => console.log(e));
console.log("______________________");
BST.postOrder((e) => console.log(e));
console.log("______________________");

BST.insert(150);
BST.insert(193);
BST.insert(240);
BST.insert(102);
BST.insert(122);
console.log(BST.isBalanced());
BST.rebalance();
console.log(BST.isBalanced());

BST.levelOrder((e) => console.log(e));
console.log("______________________");
BST.preOrder((e) => console.log(e));
console.log("______________________");
BST.inOrder((e) => console.log(e));
console.log("______________________");
BST.postOrder((e) => console.log(e));

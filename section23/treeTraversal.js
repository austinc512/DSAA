/*

Given any tree, how do we visit every node one time?

In a list, this is super simple because there's only one direction that you travel.

Given a binary tree:
      10
  19      6  
99 8        20

It seems appropriate to start at the root.
Do we visit the direct children first, then the children of those children, etc. etc.?
Do we go all the way down one branch and then come back up?

There are 4 approaches to this problem.

(This is just an overview of the concepts)

Breadth First Search:
Start at the root
Then visit its direct children
Then visit the children of those children
Then visit the children of those children
Etc.

Think of each new set of children as a row in the tree, and you’re just looking through all the rows


Depth First Search: 3 main order for DFS that we care about

DFS - InOrder
Start at the bottom left
Go up a level, grab all children on the right pointer
Go up a level, grab all children on the right pointer
Etc.

DFS - PreOrder
Start at the root
Branch all the way down to the bottom left
Grab all missing children on the way back up
Go down the right side

DFS - PostOrder
I can’t really tell what this one is doing.


*/

/*

BFS Pseudocode
Create a queue and a variable to store the values of nodes visited
Place the root node in the queue
Loop as long as there is anything in the queue
Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
If there is a left property on the node dequeued, add it to the queue
If there is a right property on the node dequeued, add it to the queue
Return the variable that stores the values.

      10  
  6      15  
3  8        20

step 0
Place the root node in the queue
queue: [10]
visited: []

step 1
Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
queue: []
visited: [10]

step 2
add its left and right children to the queue if they exist
queue: [6, 15]
visited: [10]

step 1
Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
queue: [15]
visited: [10, 6]

step 2
add its left and right children to the queue if they exist
queue: [15, 3, 8]
visited: [10, 6]

step 1
queue: [3, 8]
visited: [10, 6, 15]

step 2
queue: [3, 8, 20]
visited: [10, 6, 15]

there's no more children to visit, so we're just moving from the queue to visited now.

queue: []
visited: [10, 6, 15, 3, 8, 20]

*/

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(val) {
    const newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    } else {
      // is value < or > root?
      let current = this.root;
      while (current) {
        if (val === current.val) return undefined;
        if (val < current.val) {
          if (current.left === null) {
            current.left = newNode;
            return this;
          } else {
            current = current.left;
          }
        } else if (val > current.val) {
          if (current.right === null) {
            current.right = newNode;
            return this;
          } else {
            current = current.right;
          }
        }
      }
    }
  }
  contains(val) {
    if (this.root === null) return false;
    let current = this.root;
    let found = false;
    while (!found && current) {
      if (val < current.val) {
        current = current.left;
      } else if (val > current.val) {
        current = current.right;
      } else {
        return true;
      }
    }
    return false;
  }
  BFS() {
    const data = [];
    const queue = [];
    let node;
    queue.push(this.root);
    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }
  /*
  DFS PreOrder
  there's basically horizontal lines pointing down and left along the
  tree that grab elements. We always prioritize moving along the left
  pointer. We go all the way down left, left, left, left, etc.
  Then we move a level up, go along the right pointer, and then try to
  move along the left point as far as possible again.
  */
  DFSPreOrder() {
    const data = [];
    let current = this.root;
    function traverse(node) {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(current);
    return data;
  }
  DFSPostOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val);
    }
    traverse(this.root);
    return data;
  }
  DFSInOrder() {
    const data = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return data;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(6);
bst.insert(15);
bst.insert(3);
bst.insert(8);
bst.insert(20);

/*
      10  
  6      15  
3  8        20
*/

console.log(bst.BFS()); // [ 10, 6, 15, 3, 8, 20 ]
console.log(bst.DFSPreOrder()); // [ 10, 6, 3, 8, 15, 20 ]

/*

      1  
     2  3
  4 5   6 7     
 8 9 10 11 12 13 14 15


          20
    15          25 
 10    17     23     30
8 11  16 18  22 24  27  31 
*/
console.log(bst.DFSPostOrder()); // [ 3, 8, 6, 20, 15, 10 ]

const bst2 = new BinarySearchTree();
bst2.insert(20);
bst2.insert(15);
bst2.insert(25);
bst2.insert(10);
bst2.insert(17);
bst2.insert(23);
bst2.insert(30);
bst2.insert(8);
bst2.insert(11);
bst2.insert(16);
bst2.insert(18);
bst2.insert(22);
bst2.insert(24);
bst2.insert(27);
bst2.insert(31);
console.log(bst2.DFSPostOrder());
/*
[
   8, 11, 10, 16, 18, 17,
  15, 22, 24, 23, 27, 31,
  30, 25, 20
]
*/
console.log(bst2.DFSInOrder());
/*
[
   8, 10, 11, 15, 16, 17,
  18, 20, 22, 23, 24, 25,
  27, 30, 31
]
*/

/*
When to Use BFS and DFS

Let’s talk about BFS for a moment. As we’re visiting nodes in a tree, 
we’re adding the subsequent children to a queue. There is additional 
space complexity of our BFS algorithm because of the queue. 

Both BFS and DFS have a data array that’s returning all these values, 
which will have O(N) space complexity, but BFS has this additional space 
complexity due to the queue. I think the queue itself would have O(log n) 
space complexity, because a parent is popped off the queue before its 
children make it into the queue. 

Take the example of the SLL that is formed like a BST, 
which is completely one-sided along the right pointers.


Our queue would never have more than 1 item in it. You pop the parent off of 
the queue before you add its children to the queue. In this case, where there’s 
only ever a right pointer on a given node, only 1 child will ever be added back 
to the queue.

The time complexity of BFS and DFS is still the same, O(N), because we visit 
every node once.

For the DFS approach, the growing amount of function invocations on the call 
stack would lead to greater space complexity than the BFS for this one-sided 
tree structure.

For a really wide tree: BFS would take up more space, 
so DFS would be more space-efficient.

For a really narrow tree: DFS would take up more space, 
so BFS would be more space-efficient.


Use Cases for the Variants of Depth First Search:

DFS - InOrder: 
we actually get all the nodes in ascending order by value.

DFS - PreOrder:
PreOrder retains the structure of the BST, so this is useful if you want to clone or store the BST.

In other words, the output array of the PreOrder method could be input into a new 
BST one-by-one, and you would get an equivalent tree structure.

Recap:
Trees are non-linear data structures that contain a root and child nodes
Binary Trees can have values of any type, but at most 2 children for each parent
Binary Search Trees are a more specific version of binary trees where every node to the left of a parent is less than the parent, and every node to the right is greater than the parent.
We can search through Trees using BFS and DFS

*/

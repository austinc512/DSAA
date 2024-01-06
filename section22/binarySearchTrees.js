// Order of concepts: trees -> binary trees -> binary search trees

/*
Tree: a data structure that consists of nodes in a parent/child relationship.

Lists are linear.
Trees are nonlinear.

You could think of a linked list as a tree that moves only in 1 direction. 
It’s basically a special case of a tree.

Root - top node of the tree.
Child - a node directly connected to another node when moving away from the root.
Parent - the converse notion of a child.
Siblings - a group of nodes with the same parent.
Leaf - a node with no children
Edge - the connection between one node and another (the arrows in the diagrams)

Each node can have 1 or more children (or none).

You cannot have a child pointing to a sibling nor a parent. 
This is a Graph, which is another data structure.

There can also only be 1 parent node of a tree. 

Example: HTML and the DOM
The HTML structure is a tree, but the browser will parse the HTML and create the DOM. 
Behind the scenes, there’s a JavaScript object for each of the nodes created by the HTML.
You can traverse through these JS objects and perform operations at any node in the tree.

other examples:
-network routing
-abstract syntax tree
-AI - simple example: mini-max tree for tic-tac-toe. for every possible move, there's
a next-best possible example for what to do next. This is just sort of enumerating the
possibilities as they go along.
-folder structure inside your computer
-parsing JSON
*/

/*
Binary tree: each node can have 2, 1 or 0 children.

Binary search tree
        10
    (two pointers to 6 and 15)
    6           15
(pts to 3 & 8) (pts to 20)
3       8               20

Take the root 10 for example. Every element that is less than 10 is to the left of 10
in the tree. Every element that is greater than 10 is to the right.

this is the same for all nodes that are parents.

So if 8 has two children, 4 and 10

4's children cannot contain 9. that would have to exist on some branch on 8's R pointer.


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
}

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const bst = new BinarySearchTree();

// manual insertion
// bst.root = new Node(10);
// bst.root.right = new Node(13);
// bst.root.right.left = new Node(11);
// console.log(bst);
// etc.
/*
BinarySearchTree {
  root: Node {
    val: 10,
    left: null,
    right: Node { val: 13, left: [Node], right: null }
  }
}
*/

// insert
bst.insert(10);
bst.insert(9);
bst.insert(11);
// console.log(bst);
/*
BinarySearchTree {
  root: Node {
    val: 10,
    left: Node { val: 9, left: null, right: null },
    right: Node { val: 11, left: null, right: null }
  }
}
*/

// contains
console.log(bst.contains(11)); // true
console.log(bst.contains(13)); // false

/*

Big O of Binary Search Trees

Best and average case:
Insertion - O(log n)
Searching - O(log n)

As the number of nodes in the tree doubles, we only have to take one more step to find our solutions.

Worst case:
Insertion - O(n)
Searching - O(n)

This occurs in a BST that degenerates into a linear structure, resembling a linked list. 

This typically happens when the input data is already sorted or nearly sorted, causing all new elements to be inserted as right children (or left children, depending on the order). 

This is referred to as an “unbalanced” or “degenerate” BST. in unbalanced BSTs, the height of the tree is maximal, leading to operations that require traversing from the root to a leaf, thereby losing the efficiency of a balanced BST where operations typically have O(log n) time complexity.

To avoid this problem, self-balancing BSTs such as AVL trees or Red-Black trees are often used. These trees automatically adjust their structure during insertions and deletions to ensure that the tree remains approximately balanced, thereby preserving the O(log n) time complexity for key operations. 


*/

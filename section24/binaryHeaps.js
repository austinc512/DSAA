/*

a tree structure that’s very similar to a binary search tree, 
but it has different rules.

In a MaxBinaryHeap, parent nodes are always larger than child nodes. 
In a MinBinaryHeap, parent nodes are always smaller than child nodes.

Just like a BST, each node can have at most 2 children. 
MaxBH: for every parent, both children will be smaller than the parent.
MinBH: for every parent, both children will be larger than the parent.

Children will be added along the left pointer first.

MaxBH:
     41
  39    33
18  27    12

There are no guarantees between the sibling nodes. One may be greater or 
less than the other.

A binary heap is as compact as possible. All the children of each node 
are as full as they can be and left children are filled out first.

Using a MaxBH as an example.
We have the largest number at the root.
Its two children are not necessarily the next largest numbers

       100
    19      36
  13  3   25  1
 2  7

Binary Heaps are used to implement Priority Queues, which are very commonly 
used data structures.

They are also used quite a bit with graph traversal algorithms.

We can represent a heap with an array, but there’s a little bit of math involved.

For any index of an array n,
The left child is stored at 2n + 1
The right child is at 2n + 2

Finding the parent of a given child idx:
Parent = Math.floor((idx - 1) / 2)

insert the element to the end of the array.
this has the side effect of adding that element to the leftmost available child position.

compare the element to its parent. if the element is greater than the parent, swap these elements

continue to do this until the child is no longer greater than its parent

*/

class MaxBinaryHeap {
  constructor() {
    // initializing with values to make our lives easier.
    this.values = [41, 39, 33, 18, 27, 12];
  }
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      // compare this element to the parent element
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element <= parent) {
        break;
      } else if (element > parent) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
  }
  print() {
    console.log(this.values);
  }
}

const heap = new MaxBinaryHeap();
heap.insert(55);
heap.print();
/*
[
    55, 39, 41, 18,
    27, 12, 33
]
*/
heap.insert(1);
heap.print();
/*
[
    55, 39, 41, 18,
    27, 12, 33,  1
]
*/

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

INSERT:
insert the element to the end of the array.
this has the side effect of adding that element to the leftmost available child position.

compare the element to its parent. if the element is greater than the parent, swap these elements

continue to do this until the child is no longer greater than its parent

EXTRACT:
The one area we usually remove from is the root. In a MaxBinaryHeap, 
this means removing the highest value; in a MinBinaryHeap, this means 
removing the lowest value.

When we implement a priority queue, where each element is assigned a priority level and 
we want to remove things based on their priority level, the highest priority in a MBH 
will always move up to the top. That’s where we’ll remove from in our priority queue. 

The procedure for deleting the root from the heap (effectively extracting the max element 
in a max-heap or min element in a min-heap) and restoring the properties is called 
down-heap (also known as bubble-down, percolate-down, sift-down, trickle down, heapify-down, 
cascade-down, and extract-min/max)

We’re going to put an element at the root that is most likely wrong, and have it bubble 
down to the correct location.

[41,39,33,18,27,12]

we want to extract 41, and we'll put 12 in its place.

extracted: 41
[12,39,33,18,27]

Then we need to sink down.

Look at 12’s children and find which one is larger. Swap 12 with that element.
[39,12,33,18,27]
continue this process until 12 bubbled down to a suitable position.

2(n) + 1
OR 
2(n) + 2

[39,12,33,18,27]

children are: 18 and 27
swap 12 with 27

[39,27,33,18,12]

the stop condition would be if no more children exist, or if both children are smaller.


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
  extractMax() {
    const max = this.values[0];
    // special case length 1
    const end = this.values.pop();
    // now length would be 0
    if (this.values.length > 0) {
      this.values[0] = end;
      // bubble down
      this.sinkDown();
    }
    return max;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      // find children
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      // compare children
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      // element exists at swap index, so we need to start
      // the while loop again with element's new position.
      idx = swap;
    }
  }
}

// const heap = new MaxBinaryHeap();
// heap.insert(55);
// heap.print();
/*
[
    55, 39, 41, 18,
    27, 12, 33
]
*/
// heap.insert(1);
// heap.print();
/*
[
    55, 39, 41, 18,
    27, 12, 33,  1
]
*/
const heap2 = new MaxBinaryHeap();
console.log(heap2.extractMax()); // 41
console.log(heap2.extractMax()); // 39
heap2.insert(100);
heap2.insert(101);
console.log(heap2.extractMax()); // 101
console.log(heap2.extractMax()); // 100

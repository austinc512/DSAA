/*

A Priority Queue is a data structure where each element has a priority. 
Elements with higher priorities are served before elements with lower priorities.

Imagine the ER. There’s 100 people with the flu, and someone walks in with a gunshot wound. 
The person that was shot will be seen first by the ER.

You could implement a priority queue with an array. This is a naive approach, but possible. 
The only thing that matters is that there’s a priority assigned to members of the queue, 
and that we always remove the higher priority first. 

Priority queues are so often created with heaps that people confuse the two. However, a 
priority queue is just a concept, whereas we can use a heap to efficiently implement that 
concept.

We have a node class where members have val and priority fields
Just for variety, we'll implement a MinBinaryHeap.
Priority 1 will be extracted before priority 3

*/

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    // initializing with values to make our lives easier.
    this.values = [];
  }
  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      // compare this element to the parent element
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) {
        break;
      } else if (element.priority < parent.priority) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
  }
  print() {
    console.log(this.values);
  }
  dequeue() {
    const min = this.values[0];
    // special case length 1
    const end = this.values.pop();
    // now length would be 0
    if (this.values.length > 0) {
      this.values[0] = end;
      // bubble down
      this.sinkDown();
    }
    return min;
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
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
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

const ER = new PriorityQueue();
ER.enqueue('cold', 3);
ER.enqueue('fever', 2);
ER.enqueue('heart attack', 1);
ER.enqueue('gunshot', 1);

console.log(ER.dequeue()); // Node { val: 'gunshot', priority: 1 }
console.log(ER.dequeue()); // Node { val: 'fever', priority: 2 }
console.log(ER.dequeue()); // Node { val: 'cold', priority: 3 }
console.log(ER.dequeue()); // Node { val: 'cold', priority: 3 }

/*
To handle the insert order of nodes with the same priority in a priority queue, you can 
augment your Node class to include a timestamp or a sequence number that records the order 
in which elements are inserted. This way, when two nodes have the same priority, the queue 
can fall back on this secondary criteria (timestamp or sequence number) to decide which node 
to dequeue first.

Here's how you can modify your current implementation:

Modify the Node Class: Add a new property, insertTime or sequence, to the Node class. This 
property will be set when the node is created.

Update the enqueue Method: Whenever a new node is added to the queue, assign the current 
timestamp or an incrementing sequence number to this new property.

Adjust the Comparison Logic: In your bubbleUp and sinkDown methods, modify the comparison 
logic to consider the new property when the priorities of two nodes are equal.

Here's an example of how you can implement these changes:
*/

class newNode {
  constructor(val, priority, sequence) {
    this.val = val;
    this.priority = priority;
    this.sequence = sequence; // new property to track insertion order
  }
}

class PriorityQueue2 {
  constructor() {
    this.values = [];
    this.sequenceNumber = 0; // to keep track of the insertion order
  }

  enqueue(val, priority) {
    const newNode = new newNode(val, priority, this.sequenceNumber++);
    this.values.push(newNode);
    this.bubbleUp();
  }

  // ... rest of your methods

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];

      if (
        element.priority < parent.priority ||
        (element.priority === parent.priority &&
          element.sequence < parent.sequence)
      ) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      } else {
        break;
      }
    }
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (
          leftChild.priority < element.priority ||
          (leftChild.priority === element.priority &&
            leftChild.sequence < element.sequence)
        ) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority) ||
          (rightChild.priority === element.priority &&
            rightChild.sequence < element.sequence &&
            (swap === null || rightChild.sequence < leftChild.sequence))
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

/*
In this implementation, the sequence property ensures that when two nodes have the same 
priority, the one inserted first (with the smaller sequence number) will be dequeued first. 
This modification makes your priority queue stable with respect to the insertion order of 
elements with equal priorities.
*/

/*
Big O of Binary Heaps

Binary Heaps are great for insertion and deletion

Insertion: O(log n)
Removal: O(log n)
Search - O(n)

For the insertion and removal, remember this is log base 2 of n.

[100,19,36,17,12,25,5]

If I wanted to insert an element, the next available position would be 17’s left child. Let’s say I inserted 200. 
I would compare with 17 (swap), compare with 19 (swap), and then compare with 100 (swap). That’s 3 comparisons for 8 elements. 
log(base2)8 = 3

Every time the size of our array doubles, we only add 1 additional comparison to the whole set of operations that need to occur.

Unlike a binary search tree, all levels will be filled out before we move onto the next set of children.

Because of that, the worst case for insertion and removal are still O(log n).

Time complexity for search is O(n), so binary heaps are not useful for searching. 

The average case is something more like O(n / 2), but obviously that still reduces to O(n).
*/

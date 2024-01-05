// create a stack with an array

const arrStack = [];
arrStack.push('google');
arrStack.push('instagram');
arrStack.push('youtube');
// now we have an array stack, and we can .pop() off the stack
// console.log(arrStack.pop()); // youtube
// console.log(arrStack); // [ 'google', 'instagram' ]

// so using push and pop in tandem on an array creates a stack
// you could also use .unshift() and .shift() to add/remove
// however, adding/removing from the beginning is not efficient due to reindexing

// indexes aren't really useful for a stack, only the order is.

// Writing Our Own Stack From Scratch
// we can do this with a Singly Linked List instead

// later data structures will use the array implementation because it's more concise,
// but let's at least learn how to create this structure.

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  // the "pop" and "push" methods are actually shift and unshift
  // in a SLL, pop and push aren't constant time operations,
  // because you have to traverse the entire list to get the 2nd
  // to last element.
  push(val) {
    var newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      // new nodes become the first element of the stack
      let temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    // return the size in 1 line
    return ++this.size;
  }
  pop() {
    if (!this.first) {
      return null;
    }
    const temp = this.first;
    // special case length 1
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    // should probably also remove reference
    temp.next = null;
    this.size--;
    // since we're returning the val property,
    // I suppose removing the reference doesn't particularly matter.
    return temp.val;
  }
}

const testStack = new Stack();

// PUSH
// console.log(testStack.push('hello')); // 1
// console.log(testStack.push('hi')); // 2
// console.log(testStack.push("it's")); // 3
// console.log(testStack.push('me')); // 4
// console.log(testStack);
/*
Stack {
  first: Node { val: 'me', next: Node { val: "it's", next: [Node] } },
  last: Node { val: 'hello', next: null },
  size: 4
}
*/

// POP
// testStack.push('hello');
// testStack.push('hi');
// testStack.push("it's");
// testStack.push('me');

// console.log(testStack.pop()); // me
// console.log(testStack);
/*
Stack {
  first: Node { val: "it's", next: Node { val: 'hi', next: [Node] } },
  last: Node { val: 'hello', next: null },
  size: 3
}
*/

// QUEUE
// First In First Out

// Array example

const arrQueue = [];

// push will add to the end of the list
arrQueue.push('FIRST');
arrQueue.push('SECOND');
arrQueue.push('THIRD');

// shift will remove from the beginning, fulfilling the FIFO nature of this structure
// console.log(arrQueue.shift()); // FIRST
// console.log(arrQueue.shift()); // SECOND
// console.log(arrQueue.shift()); // THIRD

// we could also use unshift and pop to achieve the same I/O operations

// but again, arrays have the reindexing problem

// class implementation

// can use the same Node class as the Stack
// class Node {
//   constructor(val) {
//     this.val = val;
//     this.next = null;
//   }
// }

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = this.first;
    } else {
      // new nodes become the last element of the queue
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
    return this.size;
  }
  dequeue() {
    if (!this.first) return null;
    let temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
  }
}

const queue = new Queue();

// enqueue
// queue.enqueue('FIRST');
// queue.enqueue('SECOND');
// console.log(queue.enqueue('THIRD')); // 3
// console.log(queue);
// Queue {
//   first: Node { val: 'FIRST', next: Node { val: 'SECOND', next: [Node] } },
//   last: Node { val: 'THIRD', next: null },
//   size: 3
// }

// dequeue
queue.enqueue('FIRST');
queue.enqueue('SECOND');
queue.enqueue('THIRD');
console.log(queue.dequeue()); // FIRST
console.log(queue);
// Queue {
//   first: Node { val: 'SECOND', next: Node { val: 'THIRD', next: null } },
//   last: Node { val: 'THIRD', next: null },
//   size: 2
// }

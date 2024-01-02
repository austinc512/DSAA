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
    this.size--;
    return temp.val;
  }
}

const testStack = new Stack();

// PUSH
console.log(testStack.push('hello')); // 1
console.log(testStack.push('hi')); // 2
console.log(testStack.push("it's")); // 3
console.log(testStack.push('me')); // 4
console.log(testStack);
/*
Stack {
  first: Node { val: 'me', next: Node { val: "it's", next: [Node] } },
  last: Node { val: 'hello', next: null },
  size: 4
}
*/

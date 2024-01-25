/*
Singly Linked List
*/

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// let first = new Node('hi');
// first.next = new Node('there');
// first.next.next = new Node('buddy');
// console.log(first);
// Node {
//     val: 'hi',
//     next: Node { val: 'there', next: Node { val: 'buddy', next: null } }
//   }

// This is a bad way of making a linked list, because we have .next.next.next, etc.

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let node = new Node(val);
    // special case: length 0
    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }
  pop() {
    // special case: length 0
    if (!this.tail) return;
    // need to find node at length - 2
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    // special case: new length 0
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }
  shift() {
    if (!this.head) return;
    let temp = this.head;
    this.head = temp.next;
    this.length--;
    // special case
    if (this.length === 0) {
      // (head would already be null)
      this.tail = null;
    }
    return temp;
  }
  unshift(val) {
    let node = new Node(val);
    if (!this.head) {
      // if there's no head,
      // then there's also no tail
      this.head = node;
      this.tail = this.head;
    } else {
      // if there's already a length,
      // the tail will stay the same
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }
  get(idx) {
    if (idx < 0 || idx >= this.length) return null;
    let counter = 0;
    let current = this.head;
    while (counter !== idx) {
      current = current.next;
      counter++;
    }
    return current;
  }
  set(idx, val) {
    let current = this.get(idx);
    if (current) {
      current.val = val;
      return true;
    }
    return false;
  }
  // does not return consistent type of value
  //   insert(idx, val) {
  //     if (idx < 0 || idx > this.length) {
  //       return false;
  //     } else if (idx === this.length) {
  //       return this.push(val);
  //     } else if (idx === 0) {
  //       return this.unshift(val);
  //     } else {
  //       // we know we're in the middle somewhere
  //       // access node at idx - 1 and insert
  //       let previous = this.get(idx - 1);
  //       let node = new Node(val);
  //       node.next = previous.next;
  //       previous.next = node;
  //       length++;
  //       return true;
  //     }
  //   }

  // uses !! to coerce into boolean value
  insert(idx, val) {
    if (idx < 0 || idx > this.length) {
      return false;
    } else if (idx === this.length) {
      return !!this.push(val);
    } else if (idx === 0) {
      return !!this.unshift(val);
    } else {
      // we know we're in the middle somewhere
      // access node at idx - 1 and insert
      let previous = this.get(idx - 1);
      let node = new Node(val);
      node.next = previous.next;
      previous.next = node;
      this.length++;
      return true;
    }
  }
  remove(idx) {
    if (idx < 0 || idx >= this.length) {
      return;
    } else if (idx === this.length - 1) {
      return this.pop();
    } else if (idx === 0) {
      return this.shift();
    } else {
      let current = this.get(idx - 1);
      let removed = current.next;
      current.next = removed.next;
      // removed.next should be removed still?
      removed.next = null;
      this.length--;
      return removed;
    }
  }
  reverse() {
    // node is a temp variable
    // but it's also used in our loop
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next;
    for (let i = 0; i < this.length; i++) {
      next = node.next; // the current next node
      node.next = prev; // change next to previous node (reversing direction of pointer)
      prev = node; // shift over the previous variable
      node = next; // shift over the node property
    }
    return this;
  }
  // helper method to see the work we've done
  // making an array defeats the point of using a linked list, lol.
  print() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
  rotate(int) {
    // do something
    /*
    This function should rotate all the nodes in the list by some number passed in. For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5 and you rotate by 2, the list should be modified to 3 -> 4 -> 5 -> 1 -> 2. The number passed in to rotate can be any integer.

    Time Complexity: O(N), where N is the length of the list.

    Space Complexity: O(1)

    accepts negative numbers as arguments
    accepts large numbers like 1000

    if Math.abs(int) > this.length
    int %= this.length

    length 4,
    rotate(1) and rotate(5) do the same thing
    */
    // special cases length 0 and 1
    if (this.length === 0 || this.length === 1) {
      return;
    }
    if (Math.abs(int) > this.length) {
      int %= this.length;
    }
    let newVal;
    if (int > 0) {
      let count = 0;
      while (count < int) {
        newVal = this.shift().val;
        this.push(newVal);
        count++;
      }
    } else if (int < 0) {
      // do negative case
      let count = 0;
      while (count > int) {
        newVal = this.pop().val;
        this.unshift(newVal);
        count--;
      }
    }
  }
  rotateGPT(int) {
    if (this.length === 0 || this.length === 1 || int === 0) {
      return this;
    }

    // Adjust rotation if it's larger than the list length
    if (Math.abs(int) > this.length) {
      int %= this.length;
    }
    if (int === 0) return this;

    // Find the new tail position
    let rotateCount = int > 0 ? int : this.length + int;

    let current = this.head;
    let prev = null;

    // Move forward to the new tail position
    for (let i = 0; i < rotateCount; i++) {
      prev = current;
      current = current.next;
    }

    // Rotate the list
    if (prev) {
      prev.next = null; // Break the link to form a new tail
    }
    this.tail.next = this.head; // Link the old tail to the old head
    this.tail = prev; // Update the tail
    this.head = current; // Update the head

    return this;
  }
}

const singlyLinkedList = new SinglyLinkedList();
// singlyLinkedList.push(5).push(10).push(15).push(20);
// console.log(singlyLinkedList);

// singlyLinkedList.insert(2, 12);
// console.log(singlyLinkedList.get(0));
// console.log(singlyLinkedList.get(1));

// singlyLinkedList.rotate(1);
// console.log(singlyLinkedList.tail); // node 5
// singlyLinkedList.rotate(-1);
// singlyLinkedList.rotate(5);
// console.log(singlyLinkedList.tail); // node 5

// console.log(5 % 4);

// const testList = new SinglyLinkedList();

// rotateGPT
singlyLinkedList.push(5).push(10).push(15).push(20).push(25);
singlyLinkedList.rotateGPT(10);
console.log(singlyLinkedList.tail); // Node { val: 5, next: null }
console.log(singlyLinkedList.head);
// Node {
//   val: 10,
//   next: Node { val: 15, next: Node { val: 20, next: [Node] } }
// }

// PUSH
// testList.push('hi');
// testList.push('there');
// testList.push('how');
// testList.push('are');
// console.log(testList.push('you'));

// SinglyLinkedList {
//     head: Node { val: 'hi', next: Node { val: 'there', next: [Node] } },
//     tail: Node { val: 'you', next: null },
//     length: 5
//   }

// POP
// testList.push('init');
// testList.push('with');
// testList.push('values');

// console.log(testList.pop()); // Node { val: 'values', next: null }
// console.log(testList);
// SinglyLinkedList {
//   head: Node { val: 'init', next: Node { val: 'with', next: null } },
//   tail: Node { val: 'with', next: null },
//   length: 2
// }

// testing pop with a single element
// testList.push('init');
// console.log(testList.pop());
// console.log(testList);

// SHIFT
// testList.push('init');
// testList.push('with');
// testList.push('values');

// console.log(testList.shift());
// console.log(testList);
// Node {
//     val: 'init',
//     next: Node { val: 'with', next: Node { val: 'values', next: null } }
//   }
//   SinglyLinkedList {
//     head: Node { val: 'with', next: Node { val: 'values', next: null } },
//     tail: Node { val: 'values', next: null },
//     length: 2
//   }

// UNSHIFT
// testList.push('with');
// testList.push('values');

// testList.unshift('init');
// console.log(testList);
// SinglyLinkedList {
//     head: Node { val: 'init', next: Node { val: 'with', next: [Node] } },
//     tail: Node { val: 'values', next: null },
//     length: 3
//   }

// GET
// testList.push('init');
// testList.push('with');
// testList.push('values');

// console.log(testList.get(2));
// Node { val: 'values', next: null }

// SET
// testList.push('init');
// testList.push('with');
// testList.push('values');

// console.log(testList.tail);
// testList.set(2, 'CHANGED');
// console.log(testList.tail);

// Node { val: 'values', next: null }
// Node { val: 'CHANGED', next: null }

// INSERT

// testList.push('init');
// testList.push('with');
// testList.push('values');

// console.log(testList.insert(0, 'START'));
// console.log(testList.insert(4, 'END'));
// console.log(testList);

// true
// true
// SinglyLinkedList {
//   head: Node { val: 'START', next: Node { val: 'init', next: [Node] } },
//   tail: Node { val: 'END', next: null },
//   length: 5
// }

// REMOVE

// testList.push('init');
// testList.push('with');
// testList.push('values');

// console.log(testList.remove(1));
// console.log(testList);
// console.log(testList.remove(1));
// console.log(testList);

// Node { val: 'with', next: Node { val: 'values', next: null } }
// SinglyLinkedList {
//   head: Node { val: 'init', next: Node { val: 'values', next: null } },
//   tail: Node { val: 'values', next: null },
//   length: 2
// }
// Node { val: 'values', next: null }
// SinglyLinkedList {
//   head: Node { val: 'init', next: null },
//   tail: Node { val: 'init', next: null },
//   length: 1
// }

// REVERSE

// testList.push('init');
// testList.push('with');
// testList.push('values');

// testList.print();
// testList.reverse();
// testList.print();
// // just to make sure things look alright,
// console.log(testList);

// [ 'init', 'with', 'values' ]
// [ 'values', 'with', 'init' ]
// SinglyLinkedList {
//     head: Node { val: 'values', next: Node { val: 'with', next: [Node] } },
//     tail: Node { val: 'init', next: null },
//     length: 3
//   }

/*

Big O of Singly Linked Lists

Insertion - it depends. It can be O(1) (beginning or end) or O(N) (second to last node)

Removal - it depends. It can be O(1) (beginning) or O(N) (last node; must traverse to find second to last node)

Searching - O(N) (we have to traverse the list to find elements)

Access - O(N) (we have to traverse the list to get to elements, and we use the index as a counter starting at the head)

Recap:
Singly Linked Lists are a good alternative to arrays when insertion/deletion at the beginning are frequently required. 
Arrays have indexes, whereas Linked Lists do not
The idea of a list data structure that consists of nodes is the foundation for other data structures like Stacks and Queues.


*/

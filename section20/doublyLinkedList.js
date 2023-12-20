class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }
  pop() {
    // can use !this.head OR this.length === 0
    // both are similarly performant
    // length prop assumes no bugs exist in handling logic
    // both are idiomatic in JS
    // whatever you do, just be consistent
    if (!this.head) return undefined;
    const poppedNode = this.tail;
    // special case length 1
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // remove references from both the new tail and old tail
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }
  shift() {
    // can use !this.head OR this.length === 0
    if (!this.head) return undefined;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(idx) {
    if (idx < 0 || idx >= this.length) return null;
    let current;
    if (idx <= this.length / 2) {
      // console.log(`WORKING FROM START`);
      let count = 0;
      current = this.head;
      while (count !== idx) {
        current = current.next;
        count++;
      }
    } else {
      // console.log(`WORKING FROM END`);
      let count = this.length - 1;
      current = this.tail;
      while (count !== idx) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }
  set(idx, val) {
    const foundNode = this.get(idx);
    if (foundNode != null) {
      foundNode.val = val;
      return true;
    } else return false;
  }
  insert(idx, val) {
    if (idx < 0 || idx > this.length) {
      return false;
    } else if (idx === 0) {
      // coerce into boolean for consistency (!!)
      return !!this.unshift(val);
    } else if (idx === this.length) {
      return !!this.push(val);
    } else {
      const newNode = new Node(val);
      const prevNode = this.get(idx - 1);
      const nextNode = prevNode.next;

      prevNode.next = newNode;
      newNode.prev = prevNode;
      newNode.next = nextNode;
      nextNode.prev = newNode; // safe to do because nextNode cannot be null
      this.length++;
      return true;
    }
  }
  remove(idx) {
    if (idx < 0 || idx >= this.length) {
      return;
    } else if (idx === 0) {
      return this.shift();
    } else if (idx === this.length - 1) {
      return this.pop();
    } else {
      const removedNode = this.get(idx);
      const prevNode = removedNode.prev;
      const nextNode = removedNode.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;

      removedNode.prev = null;
      removedNode.next = null;

      this.length--;
      return removedNode;
    }
  }
}

// const node1 = new Node(1);
// const node2 = new Node(2);
// node1.next = node2;
// node1.next.prev = node1;
// console.log(node1);
// //<ref *1> Node {
// //  val: 1,
// //  next: Node { val: 2, next: null, prev: [Circular *1] },
// //  prev: null
// //}

const testList = new DoublyLinkedList();

// PUSH
// push method returns the list, so we can chain these
// testList.push(1).push(2);
// console.log(testList);
// DoublyLinkedList {
//   head: <ref *1> Node {
//     val: 1,
//     next: Node { val: 2, next: null, prev: [Circular *1] },
//     prev: null
//   },
//   tail: <ref *2> Node {
//     val: 2,
//     next: null,
//     prev: <ref *1> Node { val: 1, next: [Circular *2], prev: null }
//   },
//   length: 2
// }

// POP
// testList.push(1).push(2);
// console.log(testList.pop());
// console.log(testList);

// Node { val: 2, next: null, prev: null }
// DoublyLinkedList {
//   head: Node { val: 1, next: null, prev: null },
//   tail: Node { val: 1, next: null, prev: null },
//   length: 1
// }

// SHIFT
// testList.push(1).push(2);
// console.log(testList.shift());
// console.log(testList);

// Node { val: 1, next: null, prev: null }
// DoublyLinkedList {
//   head: Node { val: 2, next: null, prev: null },
//   tail: Node { val: 2, next: null, prev: null },
//   length: 1
// }

// UNSHIFT
// EX 1
// testList.push(1).push(2);
// console.log(testList.unshift(0));

// DoublyLinkedList {
//   head: <ref *1> Node {
//     val: 0,
//     next: Node { val: 1, next: [Node], prev: [Circular *1] },
//     prev: null
//   },
//   tail: <ref *2> Node {
//     val: 2,
//     next: null,
//     prev: Node { val: 1, next: [Circular *2], prev: [Node] }
//   },
//   length: 3
// }

// EX 2
// console.log(testList.unshift(0));
// DoublyLinkedList {
//   head: Node { val: 0, next: null, prev: null },
//   tail: Node { val: 0, next: null, prev: null },
//   length: 1
// }
// (head and tail get set properly)

// GET
// testList.push(0).push(1).push(2).push(3).push(4).push(5);
// console.log(testList.get(2));
// WORKING FROM START
// <ref *2> Node {
//   val: 2,
//   next: <ref *1> Node {
//     val: 3,
//     next: Node { val: 4, next: [Node], prev: [Circular *1] },
//     prev: [Circular *2]
//   },
//   prev: <ref *3> Node {
//     val: 1,
//     next: [Circular *2],
//     prev: Node { val: 0, next: [Circular *3], prev: null }
//   }
// }
// console.log(testList.get(4));
// WORKING FROM END
// <ref *1> Node {
//   val: 4,
//   next: Node { val: 5, next: null, prev: [Circular *1] },
//   prev: <ref *2> Node {
//     val: 3,
//     next: [Circular *1],
//     prev: Node { val: 2, next: [Circular *2], prev: [Node] }
//   }
// }

// SET
// testList.push(0).push(1).push(2).push(3).push(4).push(5);
// console.log(testList.set(5, 50)); // true
// console.log(testList.set(6, 600)); // false
// console.log(testList.get(5));
// <ref *1> Node {
//   val: 50,
//   next: null,
//   prev: <ref *2> Node {
//     val: 4,
//     next: [Circular *1],
//     prev: Node { val: 3, next: [Circular *2], prev: [Node] }
//   }
// }

// INSERT
// testList.push(0).push(1).push(2).push(3).push(4).push(5);
// console.log(testList.insert(-1, 5)); // false
// console.log(testList.insert(4, '4')); // true
// console.log(testList.get(4));
// <ref *2> Node {
//   val: '4',
//   next: <ref *1> Node {
//     val: 4,
//     next: Node { val: 5, next: null, prev: [Circular *1] },
//     prev: [Circular *2]
//   },
//   prev: <ref *3> Node {
//     val: 3,
//     next: [Circular *2],
//     prev: Node { val: 2, next: [Circular *3], prev: [Node] }
//   }
// }

// REMOVE
// testList.push(0).push(1).push(2).push(3).push(4).push(5);
// console.log(testList.remove(4)); // Node { val: 4, next: null, prev: null }
// console.log(testList);
// DoublyLinkedList {
//   head: <ref *1> Node {
//     val: 0,
//     next: Node { val: 1, next: [Node], prev: [Circular *1] },
//     prev: null
//   },
//   tail: <ref *2> Node {
//     val: 5,
//     next: null,
//     prev: Node { val: 3, next: [Circular *2], prev: [Node] }
//   },
//   length: 5
// }

// I will be drilling these until I remember them like the back of my hand.
// I'll likely be deleting these every day, and rewriting them.

// Binary Search

const binarySearch = (arr, target) => {
  // do something
  let p1 = 0;
  let p2 = arr.length - 1;
  while (p1 <= p2) {
    // do something
    let mid = Math.floor((p1 + p2) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      p1 = mid + 1;
    } else if (arr[mid] > target) {
      p2 = mid - 1;
    }
  }
  return -1;
};

// console.log(binarySearch([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3], 2));

// Bubble Sort
// largest value bubbles to the end of the array
// subsequent iteration needs to check 1 less element
// no swaps optimization can short circuit operations

const bubbleSort = (arr) => {
  // do something
  let noSwaps = false;
  for (let i = arr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i; j++) {
      // do something
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
};
// console.log(bubbleSort([5, 4, 3, 2, 1]));

// Selection Sort
// Selection sort will compare all elements and insert the smallest one at the beginning
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let smallest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) smallest = j;
    }
    if (smallest !== i) {
      // swap arr[i] arr[smallest]
      [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    }
  }
  return arr;
};
// console.log(selectionSort([5, 4, 3, 2, 1]));

// Insertion Sort
// It builds up the sort by gradually creating a larger left side which is always sorted.
// outer for loop goes forward
// inner loop goes backwards and inserts in correct position

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    // sorted within subarray
    if (arr[i] > arr[i - 1]) continue;
    // unsorted within subarray
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }
  return arr;
};
// console.log(insertionSort([4, 1, 2, 3, 4, 5, 3, 2, 1]));
// console.log(insertionSort([3, 1, 2]));

// Merge Sort
// sorting 2 sorted arrays is easier than sorting 1 non-sorted array.
// also, recursion

const sortHelper = (arr1, arr2) => {
  let p1 = 0;
  let p2 = 0;
  const sortArr = [];
  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] < arr2[p2]) {
      sortArr.push(arr1[p1]);
      p1++;
    } else {
      sortArr.push(arr2[p2]);
      p2++;
    }
  }
  return [...sortArr, ...arr1.slice(p1), ...arr2.slice(p2)];
};

// console.log(sortHelper([1, 3, 5, 7], [2, 4, 6]));
// sortHelper works.

const mergeSort = (arr) => {
  // base case
  if (arr.length <= 1) return arr;
  // recursive case
  // split array in half-ish
  const half = Math.floor(arr.length / 2);
  // recursively call the function on l/r sides
  const left = mergeSort(arr.slice(0, half));
  const right = mergeSort(arr.slice(half));
  // return sortHelper with l/r recursive calls
  return sortHelper(left, right);
};

// console.log(mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 100, 99, 45, 3, 0]));

// quick sort uses a partition helper function to rearrange elements greater
// than or less than a pivot element.

// START pivot:
const partitionStart = (arr, startIdx = 0, endIdx = arr.length - 1) => {
  let pivot = arr[startIdx];
  let swapIdx = startIdx;
  let swapCheck = false;
  for (let i = startIdx + 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      swapIdx++;
      [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
      swapCheck = true;
    }
  }
  if (!swapCheck) {
    return startIdx;
  } else {
    [arr[startIdx], arr[swapIdx]] = [arr[swapIdx], arr[startIdx]];
    return swapIdx;
  }
};

const quickSortStart = (arr, startIdx = 0, endIdx = arr.length - 1) => {
  if (startIdx < endIdx) {
    let pivotIdx = partitionStart(arr, startIdx, endIdx); // 3
    // left
    quickSortStart(arr, startIdx, pivotIdx - 1);
    // right
    quickSortStart(arr, pivotIdx + 1, endIdx);
  }
  return arr;
};
// console.log(quickSortStart([4, 6, 9, 1, 2, 5, 3]));
// [
//   1, 2, 3, 4,
//   5, 6, 9
// ]

// MIDDLE pivot:
function partitionMiddle(arr, left, right, pivotIndex) {
  let pivotValue = arr[pivotIndex];
  while (left <= right) {
    // Find left element that should be on the right
    while (arr[left] < pivotValue) {
      left++;
    }

    // Find right element that should be on the left
    while (arr[right] > pivotValue) {
      right--;
    }

    // Swap elements, and move left and right indices
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return left;
}

function quickSortMiddle(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    // Determine the middle index
    let pivotIndex = Math.floor((left + right) / 2);
    // Partition the array around the pivot
    pivotIndex = partitionMiddle(arr, left, right, pivotIndex);
    // Recursively apply the same logic to the left and right subarrays
    quickSortMiddle(arr, left, pivotIndex - 1);
    quickSortMiddle(arr, pivotIndex + 1, right);
  }
  return arr;
}
// console.log(quickSortMiddle([9, -3, 5, 2, 6, 8, -6, 1, 3]));
// [
//   -6, -3, 1, 2, 3,
//    5,  8, 6, 9
// ]

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(val) {
    let node = new Node(val);
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
    if (!this.tail) return;
    let current = this.head;
    let newTail = current;
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    // special case
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
      length++;
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
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
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
}

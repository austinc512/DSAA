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

console.log(sortHelper([1, 3, 5, 7], [2, 4, 6]));
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

console.log(mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1, 100, 99, 45, 3, 0]));

// Linear Search
// iterate through the entire array and try to find the value

// first example:
// if found, return the index
// else return -1

const linearSearch = (arr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return i;
  }
  return -1;
};
// Time complexity: O(n)

// Binary Search
// Rather than eliminating one element at a time, you can eliminate half of the remaining elements at a time.
// Binary search only works on SORTED arrays.

const binarySearch = (arr, target) => {
  let p1 = 0;
  let p2 = arr.length - 1;
  while (p1 <= p2) {
    let midPoint = Math.floor((p1 + p2) / 2);
    console.log({ p1, p2, midPoint });
    if (arr[midPoint] === target) return midPoint;
    else if (arr[midPoint] < target) p1 = midPoint + 1;
    else if (arr[midPoint] > target) p2 = midPoint - 1;
  }
  return -1;
};

// console.log(binarySearch([1, 1, 2, 3], 2));

const naiveStringSearch = (str, subStr) => {
  let count = 0;
  const len = subStr.length;
  for (let i = 0; i < str.length; i++) {
    // if first letter matches
    if (str[i] === subStr[0]) {
      // check to see if subsequent indexes
      if (subStr.slice(1) === str.slice(i + 1, i + len)) {
        console.log(i);
        count++;
        // add extra logic to move iteration forward?
        i += len;
      }
    }
  }
  return { count };
};
// console.log(naiveStringSearch('asdfghasdfghjasdfghjkasdfghjkl', 'asdf')); // 4
// what if the string was "aaaa" and target was "aaa"
// this solution would overlook that.
// So this i += len optimization in not useful unless we can ensure no overlapping substrings.

// previously I found any instance of the element with Binary Search
const anyInstanceBinarySearch = (arr, target) => {
  let p1 = 0;
  let p2 = arr.length - 1;
  while (p1 <= p2) {
    let midPoint = Math.floor((p1 + p2) / 2);
    console.log({ p1, p2, midPoint });
    if (arr[midPoint] === target) return midPoint;
    else if (arr[midPoint] < target) p1 = midPoint + 1;
    else if (arr[midPoint] > target) p2 = midPoint - 1;
  }
  return -1;
};
// if target === middle element, return the index
// if middle < target, search right hand
// if middle > target, search left hand

// but we can also find the first/last instance of the element:

// Finding the first:
const findFirstOccurrence = (arr, target) => {
  let p1 = 0;
  let p2 = arr.length - 1;
  let result = -1;
  while (p1 <= p2) {
    const first = arr[p1];
    const last = arr[p2];
    const middle = Math.floor(p1 + (p2 - p1) / 2);
    const middleElement = arr[middle];

    console.log({ p1, first, p2, last, middle, middleElement });

    if (arr[middle] < target) {
      // If middle is less than target, search the right half.
      p1 = middle + 1;
    } else if (arr[middle] > target) {
      // If middle is greater than target, search the left half.
      p2 = middle - 1;
    } else {
      // If the target is equal to the middle element, record the index, but continue the search in the left half (since the first occurrence could be to the left).
      result = middle;
      p2 = middle - 1;
    }
  }
  return result;
};
console.log(' ');
console.log(findFirstOccurrence([1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6], 4));

const findLastOccurrence = (arr, target) => {
  let p1 = 0;
  let p2 = arr.length - 1;
  let result = -1;
  while (p1 <= p2) {
    const first = arr[p1];
    const last = arr[p2];
    const middle = Math.floor(p1 + (p2 - p1) / 2);
    const middleElement = arr[middle];

    console.log({ p1, first, p2, last, middle, middleElement });

    if (arr[middle] < target) {
      // If middle is less than target, search the right half.
      p1 = middle + 1;
    } else if (arr[middle] > target) {
      // If middle is greater than target, search the left half.
      p2 = middle - 1;
    } else {
      // If the target is equal to the middle element, record the index, but continue the search in the right half (since the last occurrence could be to the right).
      result = middle;
      p1 = middle + 1;
    }
  }
  return result;
};

console.log(findLastOccurrence([1, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 5, 6, 6], 4));

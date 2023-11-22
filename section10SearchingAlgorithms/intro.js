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
console.log(naiveStringSearch('asdfghasdfghjasdfghjkasdfghjkl', 'asdf'));
// it seems like this is slightly better than the given implementation, but it's not exactly good in the first place.

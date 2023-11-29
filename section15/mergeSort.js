/*
[8, 3, 5, 4, 7, 6, 1, 2]
split this into two halves
[8, 3, 5, 4] and [7, 6, 1, 2]
split this into 4 arrays of length 2
[8, 3], [5, 4], [7, 6], and [1, 2]
split into single element arrays
[8], [3], [5], [4], [7], [6], [1], [2]

Now merge them back in a sorted order of length 2
[3, 8], [4, 5], [6, 7], [1,2]
sorted order of length 4
[3, 4, 5, 8], [1, 2, 6, 7]

Let's consider this point in the iteration for a moment.
arr1, arr2
[3, 8], [4, 5]

Compare idx 0 from both arrays. 3 is smaller. It is inserted first.
outputArr [3]
Compare arr1[1] to arr2[0]. Which one is smaller? arr2[0] is then inserted
outputArr [3, 4]
Compare arr1[1] to arr2[1]. Arr2[1] is smaller, so insert it
outputArr [3, 4, 5]
arr1[1] is the only element left, so it is the last to get inserted
outputArr [3, 4, 5, 8]

There's a final merge that does the same thing for the subarrays:
[3, 4, 5, 8], [1, 2, 6, 7]

Resulting in:
[1, 2, 3, 4, 5, 6, 7, 8]

The data visualization looked a bit different.

Start from the beginning:
sort first 2 elements
sort the next 2 element
sort the first 4 elements

move to the back half of array:
sort next 2 element
sort the final 2 elements
sort the last 4 elements

sort all 8 elements

*/

// Break this up into sub-problems

// assume 2 arrays are sorted, and merge those in a sorted order

// my implementation:
const myMerge = (arr1, arr2) => {
  // return 2 arrs sorted
  const outputArr = [];
  let p1 = 0;
  let p2 = 0;
  while (p1 < arr1.length && p2 < arr2.length) {
    // these could have different lengths
    // console.log({ p1, p2, outputArr });
    if (arr1[p1] < arr2[p2]) {
      outputArr.push(arr1[p1]);
      p1++;
    } else if (arr1[p1] > arr2[p2]) {
      outputArr.push(arr2[p2]);
      p2++;
    } else if (arr1[p1] === arr2[p2]) {
      outputArr.push(arr1[p1], arr2[p2]);
      p1++;
      p2++;
    }
  }
  //   console.log(arr1.length, arr2.length);
  if (p1 !== arr1.length) {
    // console.log({ p1, p2, status: `p1 !== arr1.length` });
    outputArr.push(...arr1.slice(p1));
  } else if (p2 !== arr2.length) {
    // console.log({ p1, p2, status: `p2 !== arr2.length` });
    outputArr.push(...arr2.slice(p2));
  }
  return outputArr;
};

// console.log(myMerge([1, 4, 99], [2, 3, 98, 101, 102]));
// console.log(myMerge([], [1, 4, 99]));

// My implementation does the thing just fine.
// don't need an equality case in the comparisions
// you could theoretically make it more concise like this:
const conciseMerge = (arr1, arr2) => {
  const outputArr = [];
  let p1 = 0;
  let p2 = 0;

  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] <= arr2[p2]) {
      outputArr.push(arr1[p1++]);
    } else {
      outputArr.push(arr2[p2++]);
    }
  }
  // either arr1.slice or arr2.slice won't contain any elements
  // so the ordering doesn't matter so long as they're spread after inputArr
  return [...outputArr, ...arr1.slice(p1), ...arr2.slice(p2)];
};

const mergeSort = (arr) => {
  // base case
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return myMerge(left, right);
};

console.log(mergeSort([9, 8, 7, 6, 5, 4, 3, 2, 1]));

// Insertion Sort

/*
[5, 3, 4, 1, 2]
compare 5 and three, and insert 3 in its correct place
[3, 5, 4, 1, 2]
compare 4 to the subarray 3,5 and insert 4 in its correct place
[3, 4, 5, 1, 2]
compare 1 to subarray, insert
[1, 3, 4, 5, 2]
compare 2 to subarray, insert
[1, 2, 3, 4, 5]
*/

const insertionSortAttempt = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    // sorted within subarray
    if (arr[i] > arr[i - 1]) continue;
    // unsorted within subarray
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else break;
    }
  }
  return arr;
};
// console.log(insertionSortAttempt([5, 4, 3, 2, 1]));

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let currentValue = arr[i];
    let j = i - 1;
    for (j; j >= 0 && arr[j] > currentValue; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currentValue;
  }
  return arr;
};
console.log(insertionSort([5, 4, 3, 2, 1]));

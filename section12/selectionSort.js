// Selection Sort

/*
[5, 3, 4, 1, 2] 
compare 5 to 3, 3 is the smallest element
compare 3 to 4, 3 is the smallest element
compare 3 to 1, 1 is the smallest element
compare 1 to 2, 1 is the smallest element
Transformation:
[1, 3, 4, 5, 2] 
*/

const bubbleSortSwapOptimization = (arr) => {
  let noSwaps = false;
  for (let i = arr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
};

const selectionSortAttempt = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let currentelement = arr[i];
    let compareElement = currentelement;
    let compareIndex;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < compareElement) {
        compareElement = arr[j];
        compareIndex = j;
        console.log({ assignment: compareElement, i, j });
      }
    }
    if (compareElement < currentelement) {
      console.log({ currentelement, compareElement });
      [arr[i], arr[compareIndex]] = [compareElement, arr[i]];
    }
  }
  return arr;
};

// console.log(selectionSortAttempt([5, 4, 3, 2, 1]));

// this is a little convoluted since I'm storing compareElement and compareIndex
// the simple implementation shouldn't need both of these.
// let's clean this up a bit

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }
    if (i !== lowest) [arr[i], arr[lowest]] = [arr[lowest], arr[i]];
  }
  return arr;
};
console.log(selectionSort([5, 4, 3, 2, 1]));

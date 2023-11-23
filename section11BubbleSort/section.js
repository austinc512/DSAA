// default sort method in JS

// console.log([5, 4, 3, 2, 1].sort((a, b) => a - b)); // ascending
// console.log([1, 2, 3, 4, 5].sort((a, b) => b - a)); // descending

// sort in ascending string length
// console.log(['aaaa', 'aaa', 'aa', 'a'].sort((a, b) => a.length - b.length));
// [ 'a', 'aa', 'aaa', 'aaaa' ]

// Bubble Sort

// swapping variables:

// ES5 swap
function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

// ES2015 swap
const newSwap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

const bubbleSortPersonalAttempt = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
      // compare adjacent indexes
      // swap if first is greater than second
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

// console.log(bubbleSortPersonalAttempt([5, 4, 3, 2, 1]));

const bubbleSortSwapOptimization = (arr) => {
  let noSwaps = false;
  for (let i = arr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
};

console.log(bubbleSortSwapOptimization([5, 4, 3, 2, 1]));

// ChatGPT Practice Problem
// You are given an array containing a mix of red, white, and blue colors represented by the numbers 0, 1, and 2, respectively. Your task is to sort the array in-place so that all reds come first, followed by whites, and then blues. The problem is a variant of the Dutch National Flag problem and can be efficiently solved using a sorting algorithm like bubble sort.

const sortBalloons = (balloons) => {
  let noBalloonSwaps = false;
  for (let i = balloons.length - 1; i >= 0; i--) {
    noBalloonSwaps = true;
    for (let j = 0; j < i; j++) {
      if (balloons[j] > balloons[j + 1]) {
        [balloons[j], balloons[j + 1]] = [balloons[j + 1], balloons[j]];
        noBalloonSwaps = false;
      }
    }
    if (noBalloonSwaps) break;
  }
};

// this doesn't really add anything to the implementation,
// but sure, why not practice it?

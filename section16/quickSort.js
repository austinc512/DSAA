/*

recursive algorithm
expoloits that arrs of length 0 and 1 are already sorted
works by selecting an element (the pivot), and finding the index where the pivot should end up in the sorted array.

Actually, let’s visualize this with the pivot at idx 0

[11, 40, 40, 50, 43, 10, 30, 42, 20, 6, 19, 32, 20, 41, 23, 27]

that's a chonker.



*/

// const pivotHelper = (arr, startIdx = 0, endIdx = arr.length - 1) => {
//   // for simplicity, the pivot will be the first index
//   let currentPivotIndex = startIdx;
//   const pivot = arr[currentPivotIndex];
//   // since we're using the first index as the pivot,
//   // start loop at currentPivotIndex + 1
//   // ??
//   for (let i = currentPivotIndex + 1; i <= endIdx; i++) {
//     // if larger, this pushes pivot forward
//     if (pivot > arr[i]) {
//       currentPivotIndex++;
//       // swap the current element with the element at the pivot index.
//       [arr[i], arr[currentPivotIndex]] = [arr[currentPivotIndex], arr[i]];
//       // console.log(arr);
//     }
//   }
//   [arr[currentPivotIndex], arr[startIdx]] = [
//     arr[startIdx],
//     arr[currentPivotIndex],
//   ];
//   console.log(arr);
//   return currentPivotIndex;
// };

// let arr = [5, 2, 1, 8, 4, 7, 6, 3];
// console.log(pivotHelper(arr, 0, arr.length - 1)); // 4 - returns index of correct position for the pivot
// // arr; // could be many different things, so long as 5 is at idx 4
// // [2, 1, 4, 3, 5, 8, 7, 6]

// // Final Swap Outside the Loop: Mostly correct, but there's a subtle issue. After the loop, you swap the start element with the element at currentPivotIndex. This is necessary to put the pivot in its correct place. However, you should swap the pivot with the element at currentPivotIndex - 1 if there was at least one swap. If no elements were smaller than the pivot, then the pivot is already in the correct position and doesn't need to be swapped.

// // let's see the issue

// let arr2 = [0, 5, 2, 1, 8, 4, 7, 6, 3];
// console.log(pivotHelper(arr2, 0, arr2.length - 1));

// still not failing the tests tho................

// well that sucked. I'm just gonna get a good implementation instead.

const swap = (arr, idx1, idx2) => {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

const partition = (arr, startIdx = 0, endIdx = arr.length - 1) => {
  // do something
  let pivot = arr[startIdx];
  let swapIdx = startIdx;
  let swapCheck = false;
  for (let i = startIdx + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
      swap(arr, i, swapIdx);
      swapCheck = true;
    }
  }
  if (!swap) {
    console.log(arr);
    return startIdx;
  } else {
    [arr[startIdx], arr[swapIdx]] = [arr[swapIdx], arr[startIdx]];
    console.log(arr);
    return swapIdx;
  }
};

// console.log(partition([4, 8, 2, 1, 5, 7, 6, 3])); // 3

/*

[28, 41, 4, 11, 16, 1, 40, 14, 36, 37, 42, 18]

*/

console.log(partition([24, 4]));

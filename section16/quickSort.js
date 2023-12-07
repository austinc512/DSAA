/*
recursive algorithm
expoloits that arrs of length 0 and 1 are already sorted
works by selecting an element (the pivot), and finding the index where the pivot should end up in the sorted array.
*/

const partitionStart = (arr, startIdx = 0, endIdx = arr.length - 1) => {
  // pivot is used to divide array into parts
  let pivot = arr[startIdx];
  // swapIdx keeps track of the position where elements less than
  // the pivot should be moved
  let swapIdx = startIdx;
  let swapCheck = false;
  for (let i = startIdx + 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      // if arr[i] < pivot, it should be to the left of pivot
      // To do this, swapIdx is incremented, and the current
      // element (arr[i]) is swapped with the element at the
      // new swapIdx
      swapIdx++;
      [arr[i], arr[swapIdx]] = [arr[swapIdx], arr[i]];
      swapCheck = true;
    }
  }
  if (!swapCheck) {
    // no swaps occur
    // This scenario happens when the pivot is the smallest element,
    // and no elements need to be moved.
    // console.log(arr);
    return startIdx;
  } else {
    // If swaps have occurred, the pivot is swapped with the element at
    // swapIdx. This ensures that the pivot is placed at the boundary
    // between smaller and larger elements.
    [arr[startIdx], arr[swapIdx]] = [arr[swapIdx], arr[startIdx]];
    // console.log(arr);
    return swapIdx;
  }
};

// console.log(partition([4, 8, 2, 1, 5, 7, 6, 3, 5]));
// [
//   3, 2, 1, 4, 5,
//   7, 6, 8, 5
// ]
// 3

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
// console.log(quickSortMiddle([9, -3, 5, 2, 6, 8, -6, 1, 3]));
// [
//   -6, -3, 1, 2, 3,
//    5,  6, 8, 9
// ]

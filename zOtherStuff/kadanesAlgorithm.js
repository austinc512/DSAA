/*

Kadane's Algorithm

*/

function findMinSubarraySum(arr) {
  if (arr.length === 0) return 0;

  let minSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // currentSum is the smaller of:
    //    new element
    //    new element + currentSum
    currentSum = Math.min(arr[i], currentSum + arr[i]);
    // minSum is the smaller of:
    //    minSum
    //    currentSum
    minSum = Math.min(minSum, currentSum);
  }

  return minSum;
}

function findMaxSubarraySum(arr) {
  if (arr.length === 0) return 0;

  let maxSum = arr[0];
  let currentSum = arr[0];

  for (let i = 1; i < arr.length; i++) {
    // currentSum is the larger of:
    //    new element
    //    new element + currentSum
    currentSum = Math.max(arr[i], currentSum + arr[i]);
    // maxSum is the larger of:
    //    maxSum
    //    currentSum
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

console.log(findMinSubarraySum([1, 1, 1, 1, 1, -55, 1, 1, 1, 2, 1])); // -55
console.log(findMaxSubarraySum([1, 1, 1, 1, 1, -55, 1, 1, 1, 2, 1])); // 6

/*
Boyer-Moore majority vote algorithm

The problem you are trying to solve can indeed be addressed with an O(1) space 
complexity using the Boyer-Moore Voting Algorithm. This algorithm is a popular 
choice for finding the majority element in an array. The key idea of this 
algorithm is to maintain a candidate for the majority element and a counter. As 
you iterate through the array, the counter is incremented when the current element 
is the same as the candidate and decremented when it's different. When the counter 
reaches zero, you change the candidate to the current element and reset the 
counter. Since the majority element appears more than ⌊n / 2⌋ times, it will be 
the last candidate standing.

*/

const majorityElement = (nums) => {
  let candidate = null;
  let count = 0;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate;
};

console.log(majorityElement([1, 1, 2, 1, 1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1]));

/*
Underlying Logic: 
[1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25]
(except randomized)

The list is then put together ordering everything based on 
the right-most digit. All numbers ending in 0 at the start,
then all numbers ending in 1, then all numbers ending in 2, etc.


An example might look like this (bucket built from
bottom to top):
 1  2   13   4  25
21  12   3  14  15
11  22  23  24   5

re-order the array based on the buckets:
[1, 21, 11, 2, 12, 22, 13, 3, 23, 4, 14, 24, 25, 15, 5]

we then repeat the process for the second digit instead of
the first:
 5  15  25
 4  14  24
 3  13  23
 2  12  22
 1  11  21
xx  xx  xx 

The key here, which I didn’t understand before, is that the new 
resulting array is created by starting at the bottom of each bucket
when you construct the new array.

So we start at the bottom left, then move up the column. Then go to 
the next column, and so on.

Also, if a number does not have a digit in a specific column, it is
assumed to be 0 for the purposes of this sort.
*/

// Helper methods

// 1) getDigit takes a number and a position and returns the digit at that position.

const getDigitStringMethod = (num, place) => {
  const str = '' + num;
  if (str.length <= 1) return num;
  const digit = str[str.length - 1 - place];
  return +digit;
};
// furthest digit is position 0
// console.log(getDigitStringMethod(12345, 0)); // 5
// console.log(getDigitStringMethod(12345, 1)); // 4
// console.log(getDigitStringMethod(12345, 2)); // 3
// console.log(getDigitStringMethod(12345, 3)); // 2
// console.log(getDigitStringMethod(12345, 4)); // 1

// Math based approach
const getDigit = (num, place) => {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
};
// console.log(getDigit(12345, 0)); // 5
/*
ex. 1
Math.floor(Math.abs(12345) / Math.pow(10, 0)) = Math.floor(12345 / 1)
= 12345
-------------------
12345 % 10 = 5
*/
// console.log(getDigit(12345, 1)); // 4
/*
ex. 2
Math.floor(Math.abs(12345) / Math.pow(10, 1))
= Math.floor(12345 / 10)
= Math.floor(1234.5)
= 1234
-------------------
1234 % 10 = 4
*/
// console.log(getDigit(12345, 2)); // 3
// console.log(getDigit(12345, 3)); // 2
// console.log(getDigit(12345, 4)); // 1
/*
There's another good property of this Math Method

if we try to access a ditit that's not there, we get 0 returned
that's exactly what we need for our radixSort logic.
*/

// 2) digitCount(num) - returns number of digits in num

const digitCountSimple = (num) => {
  if (Math.abs(num) < 10) return 1;
  let counter = 1;
  while (Math.abs(num) > 1) {
    num = num / 10;
    counter++;
  }
  return counter;
};
// console.log(digitCountSimple(100));

// more complex log solution
const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num)) + 1);
};
// 3) mostDigits(arr) - given an array of numbers, returns
// the number of digits in the largest number in the list

const mostDigitsSimple = (arr) => {
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    let comparison = digitCount(arr[i]);
    if (comparison > max) max = comparison;
  }
  return max;
};

const mostDigits = (arr) => {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arr[i]));
  }
  return maxDigits;
};
// console.log(mostDigits([1, 11, 1111, 44444444, 9999999])); // 8

// helper methods: getDigit, digitCount, mostDigits

const radixSort = (nums) => {
  const maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    // console.log(digitBuckets);
    nums = [].concat(...digitBuckets);
  }
  return { nums };
};

console.log(radixSort([23, 345, 5467, 12, 2345, 9852]));
console.log([].concat(...[[[1]], [[2]], [[3]]]));

// // reverse a string

const reverse = (str) => {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};
// console.log(reverse("hello"));
// // console.log("hello world??");

// Write a function that calculates the sum from 1 to n

/*

we could just do the sum directly, but that has O(n) time complexity
on the long tail, this would not be usable

there's something about conjugate pairs

1, 2, 3, 4, 5, 6, ..., n

the first and last numbers are a conjugate pair

list a couple out:
1 + n
2 + n - 1 = n + 1
all pairs sum to n + 1

In the case of an even number, every number will be paired

So we have the number of pairs * sum of each pair

(n/2) * (n + 1)
= n * (n + 1) / 2

Now how about for odd cases, where there's an unpaired number in the middle?

we can separate this out into all of the paired numbers + unpaired number

all paired numbers:
((n - 1) / 2)
we have to account for the unpaired number here, so we first subtract 1 from n,
then divide it by 2. this will give us our number of pairs

Each pair sums to n + 1, so let's multiply it.

All pairs:
((n - 1) / 2) * (n + 1)
= (n**2 - 1) / 2

now we also need to introduce the middle term back into the equasion
Middle term = (n + 1) / 2

actual sum =
(n**2 - 1) / 2 + (n + 1) / 2
= (n**2 + n) / 2
= n(n+1) / 2

So this reduces down into the same equasion, regardless of if there are even or odd terms to add together. WILD!

*/

function add1(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  return sum;
}
// // space: O(1) - we're only storing a singular variable
// // time: O(n) - as the input gets larger, the amount of operations scaled linearly

// let t1 = performance.now();
// console.log(add1(1000000000));
// let t2 = performance.now();
// console.log(`time: ${(t2 - t1) / 1000} seconds`);

function add2(n) {
  return (n * (n + 1)) / 2;
}
// // space: O(0) - I'm not storing any variables
// // time: O(1) - if we assume math operations take constant time, then this is constant

// let t3 = performance.now();
// console.log(add2(1000000000));
// let t4 = performance.now();
// console.log(`time: ${(t4 - t3) / 1000} seconds`);

// let person = {
//   name: "Austin",
//   occupation: "silly boi",
// };

// Write a function that takes in a string, and returns counts of each character in the string

const charCount = (input) => {
  str = input.toLowerCase().replaceAll(/[^a-zA-z]/gi, '');
  // return an object that counts each character
  const counter = {};
  for (let i = 0; i < str.length; i++) {
    // if the property already exists in the object, increment it
    // otherwise, create that property on the object, and give it a value of 1
    if (!counter[str[i]]) {
      counter[str[i]] = 1;
    } else {
      counter[str[i]]++;
    }
  }
  return counter;
};

// console.log(charCount("aaa")); // {a: 4}
// console.log(charCount("hello!!!")); // {h: 1, e: 1, l:2, o:1}

// all elements in arr1 will be contained in arr2, but the value is squared
const same = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  // create a count of elements in the arrays
  const frequencyCounter1 = {};
  const frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  // ensure the squared key exists in frequencyCounter2
  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    // the count in frequencyCounter2 should = count in frequencyCounter1
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
};

// console.log(same([1, 2, 3, 4], [1, 4, 9, 16])); // true
// console.log(same([1, 2, 3, 4], [1, 4, 1234, 16])); // false

// const anagram = (str1, str2) => {
//   // Use the frequency counter pattern to determine if 2 input strings are anagrams
//   if (str1.length !== str2.length) {
//     return false;
//   }
//   // create a count of elements in the strings
//   const frequencyCounter1 = {};
//   const frequencyCounter2 = {};
//   for (let val of str1) {
//     frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
//   }
//   for (let val of str2) {
//     frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
//   }
//   console.log(frequencyCounter1);
//   console.log(frequencyCounter2);
//   // ensure ensure same keys exist
//   for (let key in frequencyCounter1) {
//     if (!(key in frequencyCounter2)) {
//       return false;
//     }
//     // ensure the counts are the same
//     if (frequencyCounter2[key] !== frequencyCounter1[key]) {
//       return false;
//     }
//   }
//   return true;
// };

const anagram = (str1, str2) => {
  // Use the frequency counter pattern to determine if 2 input strings are anagrams
  if (str1.length !== str2.length) {
    return false;
  }
  // create a singular counter object
  const frequencyCounter1 = {};
  for (let val of str1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let i = 0; i < str2.length; i++) {
    const letter = str2[i];
    // can't find letter or letter is zero then it's not an anagram
    if (!frequencyCounter1[letter]) {
      return false;
    } else {
      frequencyCounter1[letter]--;
    }
  }
  return true;
};

// console.log(anagram('racecar', 'rraacce')); // true, logs counter to console
// console.log(anagram('racecar', 'rraacced')); // false, doesn't log counter to console

// find first pair of integers that sums to 0
const sumZero = (arr) => {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
};

// console.log(sumZero([-3, -2, -1, 0, 1, 5]));

/*
consider the iteration
-3 _ 5 > 0 so right--
-3 + 1 < 0 so left++
-2 + 1 < 0 so left++
-1 + 1 = 0, so return [arr[left], arr[right]]
*/

// const countUniqueValuesOld = (arr) => {
//   let p1 = 0;
//   let p2 = 1;
//   for (let i = 0; i < arr.length; i++) {
//     console.log({ p1, p2 });
//     if (arr[p1] === arr[p2]) {
//       p2++;
//     } else if (arr[p1] !== arr[p2]) {
//       const local = arr[p2];
//       p1++;
//       arr[p1] = local;
//       p2++;
//     }
//   }
//   // console.log({ arr, p1, p2 });
//   return p1;
// };

// console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 1, 1, 2])); // 2
// console.log(countUniqueValues(1, 2, 3, 3, 4, 4, 5)); // 5

// console.log(
//   countUniqueValues([
//     1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 11,
//   ])
// );

const countUniqueValues254 = (arr) => {
  if (arr.length === 0) {
    return 0;
  }
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
};

// console.log(
//   countUniqueValues254([
//     1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 11,
//   ])
// );

function maxSubArraySum274(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) {
    return null;
  }
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

// console.log(maxSubArraySum274([1, 2, 5, 2, 8, 1, 5], 2)); // 10
// console.log(maxSubArraySum274([1, 2, 5, 2, 8, 1, 5], 4)); // 17

function search294(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];
    console.log({ min, max, currentElement });
    if (currentElement < val) {
      min = middle + 1;
    } else if (currentElement > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

// console.log(search294([1, 2, 3, 4, 5, 6, 11, 12, 13, 15, 19, 22, 55], 13)); // 8

// Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.

function sameFrequency317(int1, int2) {
  const str1 = '' + int1;
  const str2 = '' + int2;
  if (str1.length !== str2.length) {
    return false;
  }
  const frequencyCounter = {};
  for (let i = 0; i < str1.length; i++) {
    // increment counter from str1
    // decrement counter from str2
    frequencyCounter[str1[i]] = (frequencyCounter[str1[i]] || 0) + 1;
    frequencyCounter[str2[i]] = (frequencyCounter[str2[i]] || 0) - 1;
  }
  // if any count !== 0, return false
  for (let prop in frequencyCounter) {
    if (frequencyCounter[prop] !== 0) {
      return false;
    }
  }
  return true;
}
// console.log(sameFrequency317(35895786, 58793855));
// console.log(sameFrequency317(1234, 4321));

// function areThereDuplicates(...args) {
//   const arr = args; // [ 'a', 'b', 'c', 'a' ]
// }
// areThereDuplicates('a', 'b', 'c', 'a');

const countUniqueValuesOld = (...arr) => {
  arr = arr.sort();
  if (arr.length === 0) {
    return 0;
  }
  let i = 0;
  let j = 1;
  for (j; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return j - i > 1 ? true : false;
};

// Colt's solution is more efficient because it will short circuit
// as soon as a duplicate is found
function areThereDuplicates(...args) {
  args.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  let start = 0;
  let next = 1;
  while (next < args.length) {
    if (args[start] === args[next]) {
      return true;
    }
    start++;
    next++;
  }
  return false;
}

// console.log(countUniqueValues('a', 'b', 'c', 'd'));
// console.log(countUniqueValues('a', 'b', 'c', 'd', 'd'));
// console.log(countUniqueValues('a', 'b', 'c', 'd', 'e', 'f', 'f'));

// console.log(['a', 'b', 'c', 'a', 'd', 'e', 'f', 'f'].sort());
// console.log(['a', 'A', 'b', 'c', 'a', 'd', 'e', 'f', 'f'].sort());
// console.log('A'.charCodeAt(0));
// console.log('a'.charCodeAt(0));

// do 2 numbers exist such that their average === target?
// looking for any 2 numbers, not necessarily 2 adjacent numbers
const averagePair = (arr, target) => {
  let i = 0;
  let j = arr.length - 1;
  while (i < j) {
    let avg = (arr[i] + arr[j]) / 2;
    if (avg > target) {
      j--;
    } else if (avg < target) {
      i++;
    } else if (avg === target) {
      return true;
    }
  }
  return false;
};

// console.log(averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8)); // true
// console.log(averagePair([-1, 0, 3, 4, 5, 6], 4.1)); // false

// 4. Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

const isSubsequence = (str1, str2) => {
  /*
  at max, we'll iterate through both strings once.
  O(n + m) time complexity

  initialize two pointers outside any loops
  first pointer will be used to count iterations through str1

  second pointer will be used to count through the characters of str2
  p2 cannot start over; it must pick up where it left off whenever we compare a new character from str1

  loop through str1 and find that character in str2
  only when you find that character do you start looking for the next character in str1

  if we get to the end of str2 and not all chars have been matched in str1, return false
  if we match all the characters, return true
  */
  let p2 = 0;
  for (let p1 = 0; p1 < str1.length; p1++) {
    while (str1[p1] !== str2[p2]) {
      if (p2 === str2.length) {
        return false;
      }
      p2++;
    }
  }
  return true;
};

// console.log(isSubsequence('sing', 'sting')); // true
// console.log(isSubsequence('abc', 'acb')); // false

const maxSubarraySum = (arr, count) => {
  if (arr.length < count) return null;

  let maxSum = 0;
  let currentSum = 0;
  for (let i = 0; i < count; i++) {
    maxSum += arr[i];
  }
  // the current sum is the 'sliding window'
  // the maxSum gets reassigned whenever currentSum > maxSum
  currentSum = maxSum;
  // sum = first "count" of indexes.
  for (let j = count; j < arr.length; j++) {
    currentSum = currentSum - arr[j - count] + arr[j];
    if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }
  return maxSum;
};
// console.log(maxSubarraySum([100, 200, 300, 400], 2)); // 700
// console.log(maxSubarraySum([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)); // 39

// const minSubArrayLenOld = (arr, sum) => {
//   // return smallest subarray that is >= sum
//   const totalSum = arr.reduce((acc, curr) => acc + curr, 0);
//   if (totalSum < sum) return 0;
//   let windowStart = 0;
//   let currentSum = 0;
//   while (currentSum < sum) {
//     currentSum += arr[windowStart];
//     windowStart++;
//   }
//   // the first length that satisfies the condition
//   let targetLength = windowStart;
//   // windowStart is length of the window

//   for (let i = windowStart; i < arr.length; i++) {
//     // slide that window along the array, and see if the localSum is >=10
//     currentSum = currentSum - arr[i - windowStart] + arr[i];
//     console.log(currentSum);
//     if (currentSum >= sum) {
//       // see if I can decrease the window
//     }
//   }
// };

/*
starting from the beginning of the array
find the first subarray that meets the sum

slide that window along the array, and see if the localSum is >=10
if so, can we delete an element from the window itself?

move window over on the left side. I don't have a complete rationale for this
but that seems correct.

if the sum is still >=10, make this the new window.

Continue this same process for the rest of the length of the array.
*/

function minSubArrayLen(nums, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLength = Infinity;
  while (end < nums.length) {
    // Add nums[end] to total and move the end pointer to the right
    total += nums[end];
    end++;
    // Shrink the window as small as possible while the total is larger than sum
    while (total >= sum) {
      minLength = Math.min(minLength, end - start);
      total -= nums[start];
      start++;
    }
  }
  return minLength === Infinity ? 0 : minLength;
}

// console.log(minSubArrayLen([4, 5, 4, 4, 5, 5, 4, 4, 10], 10)); // 1
// console.log(minSubArrayLen([0, 0, 0], 55));
// console.log(minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 21, 62, 33, 19], 52)); // 1 -> because [62] is greater than 52
// minSubArrayLen([5, 5, 4, 4, 5, 4, 4, 4], 10);
// minSubArrayLen([5, 4, 4, 4, 5, 4, 5, 5], 10);

const findUnique = (arr) => {
  const counter = {};
  const uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    counter[arr[i]] = (counter[arr[i]] || 0) + 1;
  }
  for (let property in counter) {
    if (counter[property] === 1) {
      uniqueArr.push(property);
    }
  }
  return uniqueArr;
};
// console.log(findUnique([4, 3, 2, 7, 8, 2, 3, 1]));

function minSubArrayLen(nums, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let minLength = Infinity;

  while (end < nums.length) {
    // Add nums[end] to total and move the end pointer to the right
    total += nums[end];
    end++;

    // Shrink the window as small as possible while the total is larger than sum
    while (total >= sum) {
      minLength = Math.min(minLength, end - start);
      total -= nums[start];
      start++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

// console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2, bc [4,3]

const findLongestSubstringOld = (str) => {
  if (str.length === 0 || str.length === 1) {
    return str.length;
  }
  let p1 = 0;
  let p2 = 1;
  let largestLength = 1;
  let uniqueMap = {};
  uniqueMap[str[p1]] = 1;
  while (p2 < str.length) {
    if (!uniqueMap[str[p2]]) {
      uniqueMap[str[p2]] = 1;
      largestLength = Math.max(largestLength, p2 - p1 + 1);
      p2++;
      console.log(uniqueMap);
    } else {
      uniqueMap.else = true;
      console.log(uniqueMap);
      // reset everything...
      // p1 = p2;
      p1++;
      p2 = p1 + 1;
      uniqueMap = {};
      uniqueMap[str[p1]] = 1;
    }
  }

  return largestLength;
};
// Time complexity: O(n^2)

const findLongestSubstring = (str) => {
  if (str.length === 0) return 0;
  let p1 = 0;
  let largestLength = 0;
  let uniqueMap = new Map();
  for (let p2 = 0; p2 < str.length; p2++) {
    const char = str[p2];
    if (uniqueMap.has(char)) {
      // Move p1 to the right of the duplicate character's last occurrence
      p1 = Math.max(p1, uniqueMap.get(char) + 1);
    }
    uniqueMap.set(char, p2);
    largestLength = Math.max(largestLength, p2 - p1 + 1);
  }
  return largestLength;
};
// Time complexity: O(n)

// console.log(findLongestSubstring('thisisawesome'));
// console.log(findLongestSubstring('asdfghjkl'));

function sumRange(num) {
  if (num === 1) return 1; // base case
  return num + sumRange(num - 1); // recursive case
}
// console.log(sumRange(10));

function factorial(num) {
  if (num === 1) return 1; // base case
  return num * factorial(num - 1); // recursive case
}

// console.log(factorial(5));

const collectOddValues = (arr) => {
  let results = [];
  if (arr.length === 0) return results;

  if (arr[0] % 2 !== 0) {
    results.push(arr[0]);
  }
  results = results.concat(collectOddValues(arr.slice(1)));
  return results;
};
// console.log(collectOddValues([1, 2, 3, 4, 5, 6, 7, 8, 9]));

const power = (int, pow) => {
  if (int === 1) return 1;
  if (pow === 0) return 1;
  if (pow === 1) return int;
  return int * power(int, pow - 1);
};
// console.log(power(21, 0));

function factorial(num) {
  if (num === 1 || num === 0) return 1; // base case
  return num * factorial(num - 1); // recursive case
}
// console.log(factorial(7));

const productOfArray = (arr) => {
  if (arr.length === 0) return 1;
  const results = arr[0] * productOfArray(arr.slice(1));
  return results;
};
// console.log(productOfArray([0, 1, 2, 3])); // 0
// console.log(productOfArray([1, 2, 3, 4, 5])); // 120
// console.log(productOfArray([-1, 2, 3, 4, 5])); // -120

const recursiveRange = (num) => {
  if (num === 1) return num;
  return num + recursiveRange(num - 1);
};
// console.log(recursiveRange(6));

const fib = (num) => {
  // base case
  if (num === 2 || num === 1) return 1;
  // recursive case
  return fib(num - 1) + fib(num - 2);
};
// console.log(fib(10)); // 55

const reverse686 = (str) => {
  // base case
  if (str.length === 1) return str[0];
  if (str.length === 0) return '';
  // recursive case
  return reverse686(str.slice(1)) + str[0];
};
// console.log(reverse686('hello')); // olleh

const isPalindrome = (str) => {
  // base case
  if (str.length === 1 || str.length === 0) return true;
  // check for equality
  if (str[0] !== str[str.length - 1]) return false;
  // recursive case
  return isPalindrome(str.slice(1, str.length - 1));
};
// console.log(isPalindrome('racecar')); // true
// console.log(isPalindrome('racecardj')); // false

// if any array element returns true from the callback function,
// return true
const someRecursive = (arr, callback) => {
  // base case
  if (arr.length === 0) return false;
  if (callback(arr[0]) === true) return true;
  // recursive case
  return someRecursive(arr.slice(1), callback);
};

const isOdd = (val) => val % 2 !== 0;

// console.log(someRecursive([2, 4, 2, 4, 2], isOdd));

const flatten = (arr) => {
  // base case
  if (arr.length === 0) return [];
  let outputArr = [];
  if (typeof arr[0] === 'number') {
    // console.log({ arrBlock: false, value: arr[0] });
    outputArr.push(arr[0]);
    return outputArr.concat(flatten(arr.slice(1)));
  } else if (Array.isArray(arr[0])) {
    // console.log({ arrBlock: true, value: arr[0] });
    return outputArr.concat(flatten(arr[0])).concat(flatten(arr.slice(1)));
  }
};
// ^^ this was some absolute BS, but I figured it out
// console.log(flatten([1, 2, 3, 4, [5], 6])); // [1, 2, 3, 4, 5, 6]
// console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1, 2, 3,]

function capitalizeFirst(arr) {
  // base case
  if (arr.length === 1) {
    const element = arr[0];
    return [element[0].toUpperCase() + element.slice(1)];
  }
  // recursive case
  const element = arr[0];
  return [element[0].toUpperCase() + element.slice(1)].concat(
    capitalizeFirst(arr.slice(1))
  );
}
// EZ
// console.log(capitalizeFirst(['car', 'taco', 'banana']));

// Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.
function nestedEvenSum(obj) {
  let counter = 0;
  // do some shit
  for (let property in obj) {
    // console.log(property);
    if (typeof obj[property] === 'number') {
      if (obj[property] % 2 === 0) {
        counter += obj[property];
      }
    } else if (typeof obj[property] === 'object') {
      counter += nestedEvenSum(obj[property]);
    }
  }
  return counter;
}

// var obj1 = {
//   outer: 2,
//   obj: {
//     inner: 2,
//     otherObj: {
//       superInner: 2,
//       notANumber: true,
//       alsoNotANumber: 'yup',
//     },
//   },
// };

// console.log(nestedEvenSum(obj1)); // 6
// var obj2 = {
//   a: 2,
//   b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
//   c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
//   d: 1,
//   e: { e: { e: 2 }, ee: 'car' },
// };
// console.log(nestedEvenSum(obj2)); // 10

function capitalizeWords(arr) {
  // base case
  if (arr.length === 1) {
    return [arr[0].toUpperCase()];
  }
  // recursive case
  return [arr[0].toUpperCase()].concat(capitalizeWords(arr.slice(1)));
}
// let words = ['i', 'am', 'learning', 'recursion'];
// console.log(capitalizeWords(words));

// for all properties in an object (including nested properties),
// if the value is a number, change that to a string

// need to use a for..in loop
// base case
//    property is a number
// recursive case
//    property is an object
//      property is an object, but not an array?
//        or should I be iterating over elements in the array?
//          tests don't require that I do this!
// when looking at the tests, I also can't mutate the original object.

const stringifyNumbers = (obj) => {
  const clone = JSON.parse(JSON.stringify(obj));
  for (let property in clone) {
    // console.log(typeof property);
    if (typeof clone[property] === 'number') {
      clone[property] = '' + clone[property];
    } else if (typeof clone[property] === 'object') {
      clone[property] = stringifyNumbers(clone[property]);
    }
  }
  return clone;
};
// let obj828 = {
//   one: 1,
//   test: [],
//   data: {
//     val: 4,
//     info: {
//       isRight: true,
//       random: 66,
//     },
//   },
// };
// console.log(stringifyNumbers(obj828));

const collectStrings = (obj) => {
  const returnArr = [];
  for (let property in obj) {
    if (typeof obj[property] === 'string') {
      // am accessing all nested strings
      console.log(obj[property]);
      returnArr.push(obj[property]);
    } else if (typeof obj[property] === 'object') {
      return returnArr.concat(collectStrings(obj[property]));
    }
  }
  return returnArr;
};
// const obj854 = {
//   stuff: 'foo',
//   data: {
//     val: {
//       thing: {
//         info: 'bar',
//         moreInfo: {
//           evenMoreInfo: {
//             weMadeIt: 'baz',
//           },
//         },
//       },
//     },
//   },
// };
// console.log(collectStrings(obj854)); // [ 'foo', 'bar', 'baz' ]

/*

even in this course, we've already used a hash table without calling it as such.
We can make use of objects and maps in JS to implement hash tables.

Imagine we want to store some hex strings for colors. You could store this information
in an array, however it's not very descriptive. Having a key that describes the color
of the hex string makes this information easier to interact with. 

colors['cyan'] is better than colors[2] if I need to retrieve the corresponding hex string.

How can we get human-readability and computer readability? Computers don’t know how to find 
an element at idx pink. Hash tables solve this problem.

In order to look up values by key, we need a way to convert keys into valid array indices.

A function that performs this task is called a hash function.

Let’s say we have key:value pairs that we want to store in an array.

Our hashing function will take in the key, and return the index where we want to store this 
value.

This hashing function can be used during insertion to find the correct index to store the 
element, and the hashing function will also be used during retrieval to find the correct 
index. 

The hashing function we create must be a pure function that always returns the same index for 
the same input key. The responsibility of insertion, deletion, collision resolution, and 
other aspects of managing the hash table are handled separately from the hashing function. 

chatGPT example of hashing function:

function simpleHash(key, tableSize) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash % tableSize;
}

const index = simpleHash('someKey', 100);
console.log(index); // This will always print the same value for 'someKey'


A hash function takes data of arbitrary size, and it’s going to return data of a fixed size. It’s going to map an input to an output of a fixed size.

What makes a good hash?

1. It must be fast.
2. Doesn’t cluster outputs at specific indices, but distributes uniformly
3. Deterministic (same input yields same output)


*/

// create a simple hash function
// hash('pink', 10)

// const testStr1 = 'a';
// console.log(testStr1.charCodeAt(0)); // 97
/*
Let's assume we're only going to work with lowerCase strings
to make things easier, we can make 'a' correspond to 1, 
so substract 96 from the character code

We could make a simple hashing function by adding these character codes as a sum.

*/

const testStr2 = 'hello';
const simpleHash = (str, length) => {
  str = str.toLowerCase();
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    const charValue = str.charCodeAt(i) - 96;
    sum += charValue;
  }
  return sum % length;
};
// console.log(simpleHash(testStr2, 11)); // 8
/*
using this hashing algorithm, a collision would occur with anagrams

So will "ad" and "bc" even though they are not anagrams because the sum of their character 
values is the same.

Length-based Collisions: The % length part of the function will cause collisions for strings 
whose character sums, when divided by length, have the same remainder. For instance, if 
length is 10, then any two strings whose character sums differ by a multiple of 10 will 
collide.

Other problems:
It only works on strings
It’s also not constant time - linear in key length
Could be a little more random
*/

const betterHash = (key, arrLen) => {
  let total = 0;
  let WEIRD_PRIME = 31;
  for (let i = 0; i < Math.min(key.length, 100); i++) {
    let char = key[i];
    let value = char.charCodeAt(0) - 96;
    // let value = key.charCodeAt(i) - 96;
    total = (total * WEIRD_PRIME + value) % arrLen;
  }
  return total;
};

// The prime number in the hash is helpful in spreading out the keys more uniformly.
// It’s also helpful if the array that you’re putting values into has a prime length.

// console.log(betterHash('cyan', 13)); // 5
// console.log(betterHash('pink', 13)); // 5

// we found a collision.
// how should be handle collisions?

/*
Handling Collisions

Even with a large array and a great hash function, collisions are inevitable.
There are many different strategies for dealing with collisions, but we’ll focus on two:

1. Separate Chaining
2. Linear Probing


Separate chaining: at each index in our array we store values using a more sophisticated data 
structure (e.g. an array or a linked list).

This allows us to store multiple key:value pairs at the same index.

Let’s say our hashing function returns 4 for both ‘darkblue’ and ‘salmon’. At index 4, we 
could store a nested array to hold both of these values
*/
const testArr1 = new Array(13);
testArr1[4] = [
  ['darkblue', '#00008b'],
  ['salmon', '#fa8072'],
];
// console.log(testArr1);
// [
//     <4 empty items>,
//     [ [ 'darkblue', '#00008b' ], [ 'salmon', '#fa8072' ] ],
//     <8 empty items>
// ]

/*
Linear Probing: when we find a collision, we search through the array to find the next empty slot.

Let’s say darkblue, salmon, and tomato all return 4 from our hashing function.
In this scenario, we find the next available spot in the array, and we assign the new element there.
*/
testArr1[4] = [['darkblue', '#00008b']];
testArr1[5] = ['salmon', '#fa8072'];
testArr1[6] = ['tomato', '#hexValue'];
// console.log(testArr1);
// [
//     <4 empty items>,
//     [ [ 'darkblue', '#00008b' ] ],
//     [ 'salmon', '#fa8072' ],
//     [ 'tomato', '#hexValue' ],
//     <6 empty items>
// ]
/*
Note: Separate Chaining allows us to store more data than the original length of our array.
Linear Probing does not.
*/

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

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }
  /*
  Make hash a private method. it can be called from other methods within the class,
  but it cannot be accessed directly from an instance of the HashTable class.
  This approach ensures that the hashing function is encapsulated within the class
  and not exposed as part of the class's public interface.
  */
  #hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      // console.log(total * WEIRD_PRIME + value);
      // console.log(`modulus 53`);
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
      // console.log({ total });
    }
    return total;
  }
  /*
  Set:
    1. Accepts a key and a value
    2. Hash the key
    3. Store the key:value pair as a nested array at that index. We’re implementing separate chaining
  */
  // Original version
  set(key, value) {
    let index = this.#hash(key);
    // return index
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }

  // handling duplicates
  setOverrideDuplicates(key, value) {
    let index = this.#hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    // Check if the key already exists in the bucket
    let found = false;
    for (let i = 0; i < this.keyMap[index].length; i++) {
      if (this.keyMap[index][i][0] === key) {
        // Key found, override its value
        this.keyMap[index][i][1] = value;
        found = true;
        break;
      }
    }
    // If the key wasn't found, add it as a new entry
    if (!found) {
      this.keyMap[index].push([key, value]);
    }
  }

  /*  
  Get:
    1. Accepts a key
    2. Hashes the key
    3. Retrieves the key:value pair in the hash table
    4. If the key isn’t found, return undefined
  */
  get(key) {
    // My implementation
    let index = this.#hash(key);
    if (this.keyMap[index]) {
      return this.keyMap[index].find((element) => element[0] === key)[1];
    }
    // Colt's implementation:
    // if (this.keyMap[index]) {
    //   for (let i = 0; i < this.keyMap[index].length; i++) {
    //     if (this.keyMap[index][i][0] === key) {
    //       return this.keyMap[index][i][1];
    //     }
    //   }
    // }
    return undefined;
  }
  values() {
    const valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let item of this.keyMap[i]) {
          valuesArr.push(item[1]);
        }
      }
    }
    return valuesArr;
  }
  uniqueValues() {
    const valuesArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let item of this.keyMap[i]) {
          if (!valuesArr.includes(item[1])) {
            valuesArr.push(item[1]);
          }
        }
      }
    }
    return valuesArr;
  }
  keys() {
    const keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let item of this.keyMap[i]) {
          keysArr.push(item[0]);
        }
      }
    }
    return keysArr;
  }
  uniqueKeys() {
    const keysArr = [];
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let item of this.keyMap[i]) {
          if (!keysArr.includes(item[0])) {
            keysArr.push(item[0]);
          }
        }
      }
    }
    return keysArr;
  }
}

const ht = new HashTable();
ht.set('hello', 'world'); // idx 40
ht.set('john', 'doe'); // idx 46
// console.log(ht.keyMap);
// [
//   <40 empty items>,
//   [ [ 'hello', 'world' ] ],
//   <5 empty items>,
//   [ [ 'john', 'doe' ] ],
//   <6 empty items>
// ]

console.log(ht.get('john')); // doe

const ht2 = new HashTable(17);
ht2.set('maroon', '#800000');
ht2.set('yellow', '#FFFF00');
ht2.set('olive', '#808000');
ht2.set('salmon', '#FA8072');
ht2.set('lightcoral', '#F08080');
ht2.set('mediumvoiletred', '#C71585');
ht2.set('plum', 'DDA0DD');
console.log(ht2.keyMap[8]); // [ [ 'maroon', '#800000' ], [ 'yellow', '#FFFF00' ] ]
console.log(ht2.get('maroon')); // #800000
console.log(ht2.get('yellow')); // #FFFF00
console.log(ht2.get('n0tAc0lOr')); // undefined

// values
const ht3 = new HashTable(17);
ht3.set('plum', 'DDA0DD');
ht3.set('purple', 'DDA0DD');
console.log(ht3.values()); // [ 'DDA0DD', 'DDA0DD' ]
console.log(ht3.uniqueValues()); // [ 'DDA0DD' ]
// keys
ht3.set('red', '#someHexVal');
ht3.set('red', '#someOtherHexVal');
console.log(ht3.keys()); // [ 'plum', 'purple', 'red', 'red' ]
console.log(ht3.uniqueKeys()); // [ 'plum', 'purple', 'red' ]

/*
Hash Table Big O

Insert: O(1)
Deletion: O(1)
Access: O(1)

This really comes down to how good your hash function is: how fast is the function itself? How equally does it distribute data?

Pretty much every programming language that has an implementation of a hash table has a constant time hash function.

Let’s say our hash function is garbage, and inserts everything at idx 0. In this case, everything would be O(n). 

Searching for values: still O(n) regardless of implementation. 

Recap:
Hash tables are collections of key-value pairs.
Hash tables can find values quickly given a key
Hash tables can add new key:values quickly
Hash tables store data in a large array, and work by hashing the key
A good hash should be fast, distribute keys uniformly and be deterministic
Separate chaining and linear probing are two strategies used to deal with two keys that hash to the same index

*/

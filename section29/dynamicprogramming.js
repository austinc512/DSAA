/*
Dynamic programming has entire books written about it. It’s a vast topic.

You need to be comfortable with recursion for this section. 

Dynamic Programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.

It’s a small subset of problems, but problems that can be solved with dynamic programming make a huge difference in their performance. It’s kind of like divide and conquer algorithms – they’re not always applicable but you can get efficient solutions wherever it crops up.

The word dynamic was chosen by Bellman (the creator) to capture the time-varying aspect of the problems, and because it sounded impressive. “Programming” in this context is synonymous with mathematical optimization. So this definition, in its original form, strays from the connotations we as developers might have for these words.

To use dynamic programming, we have to have 2 things: an optimal substructure must be present and we must have overlapping subproblems. 

Let’s consider each of these terms individually.

Overlapping subproblems: a problem is said to have overlapping subproblems if it can be broken down into subproblems which are reused several times. 

Take the Fibonacci sequence for example. Every number after the first two is the sum of the two preceding ones. To derive the third digit, we sum the first and second. To find the fourth digit, we sum the second and third. And so on. 

const fib = (num) => {
 // base case
 if (num === 2 || num === 1) return 1;
 // recursive case
 return fib(num - 1) + fib(num - 2);
};
// console.log(fib(10)); // 55

                    fib(5)

          fib(4)     +        fib(3)

    fib(3) + fib(2)     fib(2) + fib(1)

fib(2) + fib(1)

Our approach to Fibonacci does not consider all overlapping subproblems. We have our base cases for fib(1) and fib(2), however we haven’t considered that we also end up solving fib(3) multiple times. The most optimal solution would only do a calculation for unique subproblems once.

To contrast against this, you might also encounter all unique subproblems. Take merge sort for example. This recursively merges sorted arrays by recursively breaking the problem down into first sorting arrays of length 1 (with a singular empty array in one recursive call if there’s an odd number of elements; the odd case will continue to carry along an instance of length - 1 all the way up the chain), then of length 2, then of length 4, etc. 

Each of these sorts is done using a helper function that merges two already-sorted arrays into one sorted array. This array is returned by the recursive calls. There’s no common overlapping pattern among the recursive function calls. Each stage of the recursion is solving a unique version of the subproblem. We therefore can’t optimize against any known return values, like we can in Fibonacci.

There’s a special case of repeating data like mergeSort([10,24,10,24]), but your data probably wouldn’t look highly repetitive like that.

A problem is said to have optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems.

As mentioned with Fibonacci, the best solution to finding fib(5) includes finding the best solution for fib(4), which includes finding the best solution for fib(3), which is just a sum of our base cases. We only need to solve each of these subproblems once, and we can then construct our most efficient solution for fib(n).

With graph traversal and Dijkstra’s algorithm, the most efficient path from one vertex to another involves finding the shortest path to the other intermediary vertices first, and then constructing your solution from those subproblems. 

Finding the longest simple path (no repeating of vertices), on the other hand, does not exhibit an optimal substructure. For the longest path problem, knowing the longest paths to intermediate points does not necessarily help in constructing the longest path for the entire graph. This is a key difference from the shortest path problem, where the shortest paths to intermediate points can be used to build the shortest path for the overall problem.



*/

const fib = (num) => {
  // base case
  if (num === 2 || num === 1) return 1;
  // recursive case
  return fib(num - 1) + fib(num - 2);
};

/*

this has O(2^N) complexity
in the call stack, there will be duplicates of the same function invocation that occur.
Instead of allowing those duplicates to occur, we should memoize those return values and return
the memo where possible.

*/

const fibMemo = (n, memo = []) => {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  const res = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo[n] = res;
  return res;
};

// include the base case in the default parameter
// since there's no 0th fib number, we make idx 0 undefined

const fibMemo2 = (n, memo = [undefined, 1, 1]) => {
  if (memo[n] !== undefined) return memo[n];
  const res = fibMemo2(n - 1, memo) + fibMemo2(n - 2, memo);
  memo[n] = res;
  return res;
};

// console.log(fibMemo2(50));

// you could use the same memo instead of redeclaring a default parameter

const realMemo = [undefined, 1, 1];

const fibMemo3 = (n, memo) => {
  // console.log(memo);
  if (memo[n] !== undefined) return memo[n];
  const res = fibMemo3(n - 1, memo) + fibMemo3(n - 2, memo);
  memo[n] = res;
  return res;
};

console.log(fibMemo3(50, realMemo));

/*
Big O

concerning our memo:
Accessing an element by its index and assigning a value to a specific index (not insertion, reassignment) are both constant time operations.

As n grows, the amount of fib() calculations that need to occur grows proportionally
As n grows, the memo length grows proportionally.

Both the time and space complexity of this solution are O(N).

*/

/*
Tabulation: A Bottom-Up Approach

The way we’ve been solving this problem is a top-down approach. The value of fib(7) = fib(6) + fib(5), and so forth. 

Tabulation: storing the result of a previous result in a ‘table’ (usually an array). This is usually done using iteration. Better space complexity can be achieved using tabulation.

In the recursive solution, you'll eventually run up against the maximum call size error.


Both solutions have O(N) space complexity, but the tabulated version still uses less space because it lacks the recursive call stack.

*/

const fibTabulation = (num) => {
  if (num <= 2) return 1;
  const fibNums = [0, 1, 1];
  for (let i = 3; i <= num; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }
  return fibNums[num];
};
console.log(fibTabulation(50));

/*

Traversal - visiting every node in a graph. 
That's sort of the definition we'll work with for now.
More complex operations can be derived from this 'traversal'

In a tree structure, you'd start traversal at the root of the tree.
In a graph, we have no starting point, so the starting point is arbitrary.

There can be multiple ways to traverse from one node to another.

Graph Traversal uses:
Peer-to-peer networking
Web crawlers
Finding ‘closest’ matches/recommendations
Shortest path problems
	GPS Navigation
	Solving mazes
	AI (shortest path to win the game)


Depth First Graph Traversal

Explore as far as possible down one branch before ‘backtracking’.

When using DFS in a binary search tree, you prioritize visiting child elements before sibling elements.

In a tree, it’s pretty easy to say what ‘depth’ is vs. ‘breadth’, but that relationship is not as obvious in a graph.

*/

/*
DFSRecursive() pseudocode:

The function should accept a starting node
Create a list to store the end result, to be returned at the very end
Create an object to store visited vertices
Create a helper function which accepts a vertex

The helper function should return early in the vertex is empty
The helper should place the vertex it accepts into the visited object and push that vertex into the result array.
Loop over all the values in the adjacencyList for that vertex
If any of those values have not been visited, recursively invoke the helper function with that vertex

Invoke the helper function with the starting vertex.

General note on the depth first search approach:
We’re just defining a specific pattern of traversal, and we adhere to that pattern until we can no longer do so. After that, other areas that haven’t been visited will be traversed as we move back upward towards our starting point. 

Both the Recursive and Iterative solutions have this same behavior, but they do so in different ways.

The recursive solution traverses the graph in alphabetical order.
The iterative solution traverses the graph in reverse-alphabetical order.

*/
/*
Breadth First Search

Visit all of a Node’s children before visiting the children of those children.

There’s this concept of height when using BFS, which indicates how many levels of traversal you are away from the starting point.

The starting element doesn’t have any height, its direct children have a height of 1, the children of those children have a height of 2, etc.

Pseudocode:
This function should accept a starting vertex
Create a queue and place the starting vertex in it
Create an array to store the visited nodes
Create an object to store nodes visited
Mark the starting vertex as visited
Loop as long as there is anything in the queue
Remove the first vertex from the queue and push it into the array that stores nodes visited
Loop over each vertex in the adjacency list for the vertex you are visiting
If it is not inside the object that stores nodes visited, mark it as visited and enqueue that vertex
Once you have finished looping, return the array of visited nodes.

*/

class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdgeUndirected(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) return false;
    if (!this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
    return true;
  }
  addEdgeDirected(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) return false;
    if (!this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1].push(vertex2);
    // this.adjacencyList[vertex2].push(vertex1);
    return true;
  }
  removeEdgeUndirected(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) return false;
    if (!this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (element) => element !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (element) => element !== vertex1
    );
    return true;
  }
  removeEdgeDirected(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) return false;
    if (!this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (element) => element !== vertex2
    );
    return true;
  }
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return false;
    // Delete all edges associated with this vertex
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdgeUndirected(vertex, adjacentVertex);
    }
    // Delete the vertex itself
    delete this.adjacencyList[vertex];
    return true;
  }
  DFSRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          // return is not necessary
          return dfs(neighbor);
        }
      });
    }
    dfs(start);
    return result;
  }
  DFSIterative(start) {
    const stack = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;
    while (stack.length) {
      currentVertex = stack.pop();
      // we always visit the last thing added onto the stack
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          // though we haven't truly visited this neighbor yet,
          // it's already 'enqueued' into the stack.
          stack.push(neighbor);
          // since we're taking these from an alphabetically sorted
          // adjacencyList, we'll always travel the in a
          // reverse-alphabetical order as new elements become the
          // currentVertex
        }
      });
    }
    return result;
  }
  BFS(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;
    while (queue.length) {
      // remove elements from the front of the queue
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
  }
}

const g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdgeUndirected('A', 'B');
g.addEdgeUndirected('A', 'C');
g.addEdgeUndirected('B', 'D');
g.addEdgeUndirected('C', 'E');
g.addEdgeUndirected('D', 'E');
g.addEdgeUndirected('D', 'F');
g.addEdgeUndirected('E', 'F');

console.log(g.DFSRecursive('A')); // [ 'A', 'B', 'D', 'E', 'C', 'F' ]
console.log(g.DFSIterative('A')); // [ 'A', 'C', 'E', 'F', 'D', 'B' ]
console.log(g.BFS('A')); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
/*
Current Graph:
   A
 /   \
B     C
|     |
D --- E
\     /
   F

Explanation of traversal:
A is added to the result array and visited hashmap. 
Recursively call dfs on its neighbors:

B and C.

B will get executed first.

B is added to the result array and visited hashmap.

Its neighbors are A and D. However, A has already been visited, so we don’t get another recursive function call out of it.

Now we’re at D. 
D is added to the result array and visited hashmap

D has 2 unique neighbors, E and F, and neither of these have been visited.

E gets executed first.

E is added to the result array and visited hashmap. 

E has 3 neighbors, C, D and F. However, D has already been visited, so that leaves us with C and F.

C comes first
C is added to the result array and visited hashmap. 

It has no unique neighbors, so we’re done with that line of inquiry.

This function gets popped off the stack, so now we’re back at E’s other neighbors, F and D.

D will be compared first, but this is already in our result array and visited hashmap.

We move onto F.

F is added to the result array and visited hashmap. 

F has no unique neighbors, so its function invocation is completed.

All other function invocations have no more unique neighbors, so nothing further will be added to the result array.

More comparisons by the forEach method calls will occur as we gradually pop off the stack, but no new dfs invocations will occur since there’s nothing unique we still need to traverse.

Finally we return the result array.
   
*/

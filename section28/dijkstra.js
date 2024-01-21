/*
Dijkstra's (Shortest Path) Algorithm

Prerequisite data structures: Graphs and Priority Queues
We also need to implement a Weighted Graph
This is a very common real world algorithm. 
A lot of proprietary business logic exists on top of it.

Dijkstra’s Algorithm finds the shortest path between two vertices on a graph.


1. Every time we look to visit a new node, we pick the node with the smallest 
known distance to visit first.
2. Once we’ve moved to the node we’re going to visit, we look at each of its 
neighbors.
3. For each neighboring node, we calculate the distance by summing the total 
edges that lead to the node we’re checking from the starting node.
4. If the new total distance to a node is less than the previous total, we store 
the new shorter distance for that node.

*/

// simple priority queue
class PriorityQueueOld {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  // O(N Log N) time complexity
  sort() {
    this.values.sort((a, b) => a.priority - b.priority, 0);
  }
}

// const q = new PriorityQueue();
// q.enqueue('B', 5);
// q.enqueue('C', 10);
// q.enqueue('D', 1);
// console.log(q);
// // PriorityQueue {
// //   values: [
// //     { val: 'D', priority: 1 },
// //     { val: 'B', priority: 5 },
// //     { val: 'C', priority: 10 }
// //   ]
// // }
// console.log(q.dequeue()); // { val: 'D', priority: 1 }
// console.log(q);
// // PriorityQueue {
// //   values: [ { val: 'B', priority: 5 }, { val: 'C', priority: 10 } ]
// // }

/*
Dijkstra’s Pseudocode

This function should accept a starting and ending vertex.
Create an object (we’ll call it distances) and set each key to be every vertex in the adjacency list with a value of infinity, except for the starting vertex which should have a value of 0.
After setting a value in the distances object, add each vertex with a priority of infinity to the priority queue, except the starting vertex, which should have a priority of 0 because that’s where we begin.
Create another object called previous and set each key to be every vertex in the adjacency list with a value of null.
Start looping as long as there is anything in the priority queue.
	Dequeue a vertex from the priority queue
	If that vertex is the same as the ending vertex - we are done!
	Otherwise loop through each value in the adjacency list at that vertex
		Calculate the distance to that vertex from the starting vertex
		If the distance is less than what is currently stored in our distances object,
			Update the distances object with new lower distance
			Update the previous object to contain that vertex
			Enqueue the vertex with the total distance from the starting node
*/

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    // initializing with values to make our lives easier.
    this.values = [];
  }
  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      // compare this element to the parent element
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) {
        break;
      } else if (element.priority < parent.priority) {
        this.values[parentIdx] = element;
        this.values[idx] = parent;
        idx = parentIdx;
      }
    }
  }
  print() {
    console.log(this.values);
  }
  dequeue() {
    const min = this.values[0];
    // special case length 1
    const end = this.values.pop();
    // now length would be 0
    if (this.values.length > 0) {
      this.values[0] = end;
      // bubble down
      this.sinkDown();
    }
    return min;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      // find children
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      // compare children
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      // element exists at swap index, so we need to start
      // the while loop again with element's new position.
      idx = swap;
    }
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  addEdgeUndirected(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1]) return false;
    if (!this.adjacencyList[vertex2]) return false;
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
    // console.log(
    //   this.adjacencyList[vertex1][this.adjacencyList[vertex1].length - 1]
    // );
    // console.log(
    //   this.adjacencyList[vertex2][this.adjacencyList[vertex2].length - 1]
    // );
    return true;
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    const path = []; // to return at end
    let smallest;
    // build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there's something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        // WE ARE DONE
        // BUILD UP PATH
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            // enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
  // we haven't implemented any of the other methods from the graph for this example
}
// const ob = {
//   a: [{ node: 'b', weight: 10 }],
//   b: [{ node: 'a', weight: 10 }],
// };

// const w = new WeightedGraph();
// w.addVertex('A');
// w.addVertex('B');
// w.addEdgeUndirected('A', 'B', 10);
// console.log(w);

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdgeUndirected('A', 'B', 4);
graph.addEdgeUndirected('A', 'C', 2);
graph.addEdgeUndirected('B', 'E', 3);
graph.addEdgeUndirected('C', 'D', 2);
graph.addEdgeUndirected('C', 'F', 4);
graph.addEdgeUndirected('D', 'E', 3);
graph.addEdgeUndirected('D', 'F', 1);
graph.addEdgeUndirected('E', 'F', 1);

console.log(graph.Dijkstra('A', 'E')); // [ 'A', 'C', 'D', 'F', 'E' ]
// thank god, it works.

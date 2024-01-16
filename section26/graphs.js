/*
A graph data structure consists of a finite (and possibly mutable) set of vertices 
or nodes or points, together with a set of unordered pairs of these vertices for an 
undirected graph or a set of ordered pairs for a directed graph.

wow, big words!

So basically we have a bunch of nodes, and connections between those nodes.

In a singly linked list, we had nodes that connected to each other in a singular direction.
In a binary search tree, we had a root node with up to 2 children, and all subsequent children 
could have up to 2 children of their own. 

Think of a social media platform like facebook. Individuals will be nodes, and friends will have 
a line between them. You can start to see clusters of related people that are all connected to 
each other. Maybe they went to college together, or maybe they work at the same business. 

“Frequently bought with” on amazon.

A user’s shopping cart might contain data about what products are normally bought with each other. 
These products can be nodes, and the frequency of these products being bought together might 
create some score that associates item A with item B. This information can be stored in a graph, 
and be used to suggest products that you might want to purchase together. 

Undirected graph: there is no direction to the edges between vertices. 

Directed graph: there is polarity to edges, which can be unidirectional and bidirectional.

Weighted graph: a value is associated with an edge. 



*/

/*
We can store this graph in several ways:
0-1-2
|   |
5-4-3


Adjacency List:
[
    [1,5],
    [0,2],
    [1,3],
    [2,4],
    [3,5],
    [4,0],
]

We could ask, “does 1 connect to 5?”
Go to index 1, and see if that subarray contains element 5
Or go to index 5 and see if that subarray contains 1

In this scenario, we’re referring to these nodes by an index. 
These keys could be strings instead. 
In that case, use a hash table to store the edges between vertices. 

a-b-c
|   |
f-e-d

{
    a: ['b','f']
    b: ['a','c']
    c: ['b','d']
    d: ['c','e']
    e: ['d','f']
    f: ['e','a']
}

Side note:
Right now we’re creating an undirected graph. Since a has a connection to b, b has a connection to a.

If we wanted a directed graph, we can still use this structure. If a points to b, include that character in the hash table entry. If b doesn’t point back to a, don’t include in it its hash table entry


Adjacency Matrix:
   a  b  c  d  e  f
a  0  1  0  0  0  1
b  1  0  1  0  0  0
c  0  1  0  1  0  0
d  0  0  1  0  1  0
e  0  0  0  1  0  1
f  1  0  0  0  1  0


Adjacency Matrix Vs. List Big O

|V| - number of vertices
|E| - number of edges

Operation	    Adjacency List	Adjacency Matrix
Add Vertex	    O(1)	        O(|V^2|)
Add Edge	    O(1)	        O(1)
Remove Vertex	O(|V| + |E|)	O(|V^2|)
Remove Edge	    O(|E|)	        O(1)
Query	        O(|V| + |E|)	O(1)
Storage	        O(|V| + |E|)	O(|V^2|)

For brevity, AM = adjacency matrix and AL = adjacency list

Storage:
AM - as new data gets stored, a whole new column and row must be stored in the matrix.
AL - the size of the nested arrays is determined by how many edges and vertices we have.

If you have a lot of connections, or in other words if your data is sparse, don’t use an AM. 

AL:
- Can take up less space (in sparse graphs)
- Faster to iterate over all edges
- Can be slower to lookup specific edge

AM:
- Takes up more space (in sparse graphs)
- Slower to iterate over all edges
- Faster to lookup specific edge

Queries:
AM is O(1) because we go lookup the value between two vertices
AL is O(|V| + |E|). First find the correct subarray that contains connections (should be a 
constant time operation), and then iterate through that list of connections to see if it 
contains the correct connection.

AM is more efficient than AL for this operation because a space in memory is dedicated to a 
specific connection in an AM. AL might have a large number of connections you have to iterate 
over to find whether the value exists.

We’re going to use an Adjacency List for our implementation.

Real word data tends to be sparse, so this is the more practical example.


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
    let v1 = this.adjacencyList[vertex1];
    v1 = v1.filter((element) => element !== vertex2);
    let v2 = this.adjacencyList[vertex2];
    v2 = v2.filter((element) => element !== vertex1);
    return true;
  }
  removeEdgeDirected(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) return false;
    if (!this.adjacencyList[vertex2]) return false;
    let v1 = this.adjacencyList[vertex1];
    v1 = v1.filter((element) => element !== vertex2);
    // let v2 = this.adjacencyList[vertex2];
    // v2 = v2.filter((element) => element !== vertex1);
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
}

/*



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
}

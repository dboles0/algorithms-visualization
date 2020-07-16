function dijkstra(grid, startNode, endNode) {
    const UnvisitedNodeSet = InitializeSource(grid, startNode);
    const VisitedNodeSet = [];
    var TargetNode;
  
    while (!IsEmpty(UnvisitedNodeSet)) {
      sortUnvisitedNodes(UnvisitedNodeSet);
      TargetNode = UnvisitedNodeSet[0];
  
      if (TargetNode.distance === Infinity) return VisitedNodeSet;
      if (TargetNode === endNode) return VisitedNodeSet;
      TargetNode.isVisited = true;
      VisitedNodeSet.push(TargetNode);
      UnvisitedNodeSet.shift();
  
      if (TargetNode.isWall) continue;
      UpdateFoundNeighbors(TargetNode, grid);
    }
  
    return VisitedNodeSet;
  }
  
  function sortUnvisitedNodes(UnvisitedNodeSet) {
    return UnvisitedNodeSet.sort((a, b) => a.distance - b.distance);
  }
  
  function getShortestPath(endNode) {
    const shortestPath = [];
    let current = endNode;
    while (current) {
      shortestPath.push(current);
      current = current.previousNode;
    }
    return shortestPath;
  }
  
  function UpdateFoundNeighbors(TargetNode, grid) {
    const UnvisitedNeighbors = FindNeighbors(TargetNode, grid);
    for (var neighbor = 0; neighbor < UnvisitedNeighbors.length; neighbor++) {
      UnvisitedNeighbors[neighbor].distance = TargetNode.distance + 1;
      UnvisitedNeighbors[neighbor].previousNode = TargetNode;
    }
  }
  
  function InitializeSource(grid, startNode) {
    var StartingGrid = [];
    var count = 0;
  
    for (let row of grid) {
      for (let node of row) {
        count += 1;
        if (node.row === startNode.row && node.col === startNode.col) {
          node.distance = 0;
        }
        StartingGrid.push(node);
      }
    }
    console.log(count);
    return StartingGrid;
  }
  
  function IsEmpty(gridArray) {
    return Array.isArray(gridArray) && gridArray.length > 1 ? false : true;
  }
  
  function FindNeighbors(TargetNode, Grid) {
    const neighbors = [];
    const { row, col } = TargetNode;
    const TotalNodes = Grid.length - 1;
    const TotalColumns = Grid[0].length - 1;
  
    //check up (stop at first row)
    if (row > 0 && Grid[row - 1][col].isVisited === false)
      neighbors.push(Grid[row - 1][col]);
    //check down (stop at last element casue farther would make new row)
    if (row < TotalNodes && Grid[row + 1][col].isVisited === false)
      neighbors.push(Grid[row + 1][col]);
    // check left (stop at first col)
    if (col > 0 && Grid[row][col - 1].isVisited === false)
      neighbors.push(Grid[row][col - 1]);
    // check right (stop at last col)
    if (col < TotalColumns && Grid[row][col + 1].isVisited === false)
      neighbors.push(Grid[row][col + 1]);
  
    return neighbors;
  }
  
  let Functions = {
    dijkstra,
    getShortestPath,
  };
  
  module.exports = Functions;
  
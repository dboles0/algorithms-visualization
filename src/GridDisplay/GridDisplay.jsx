import React, { Component } from "react";
import "./GridDisplay.css";
import Dijkstra from "./Algorithms/Dijkstra";
import Node from "./Node/Node";
import Functions from "../Utilities/Utilities";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 15;
const FINISH_NODE_COL = 45;


class GridDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isMousePressed: false,
    };
  }
  componentDidMount() {
    const grid = Functions.getStartingGrid();
    this.setState({ grid });
  }

  MouseDown(row, col) {
    const newGrid = Functions.newGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid, isMousePressed: true });
  }
  MouseHold(row, col) {
    if (!this.state.isMousePressed) return;
    const newGrid = Functions.newGridWithWalls(this.state.grid, row, col);
    this.setState({ grid: newGrid, isMousePressed: true });
  }
  MouseUp() {
    this.setState({ isMousePressed: false });
  }

  AnimateShortestPath(ShortesPath) {
    for (let currentNode = 0; currentNode < ShortesPath.length; currentNode++) {
      const node = ShortesPath[currentNode];
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 5 * currentNode);
    }
  }

  AnimateDikstra(VisitedNodes, ShortesPath) {
    for (
      let currentNode = 0;
      currentNode < VisitedNodes.length;
      currentNode++
    ) {
      if (currentNode === VisitedNodes.length - 1) {
        setTimeout(() => {
          this.AnimateShortestPath(ShortesPath);
        }, 5 * currentNode);
        return;
      }
      if (!VisitedNodes[currentNode].isWall) {
        setTimeout(() => {
          document.getElementById(
            `node-${VisitedNodes[currentNode].row}-${VisitedNodes[currentNode].col}`
          ).className = "node node-visited";
        }, 5 * currentNode);
      }
    }
  }

  VisualizeDikstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const VisitedNodes = Dijkstra.dijkstra(grid, startNode, endNode);
    const ShortesPath = Dijkstra.getShortestPath(endNode);
    this.AnimateDikstra(VisitedNodes, ShortesPath);
  }

  ResetGrid() {
    window.location.reload();
    return false;
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <div className="Buttons">
          <div className="Reset">
            <button onClick={() => this.ResetGrid()}>Reset Grid</button>
          </div>
          <div className="VisualizeDikstraButton">
            <button onClick={() => this.VisualizeDikstra()}>
              Visualize Dikstras Algorithm
            </button>
          </div>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodIdx) => {
                  const {
                    row,
                    col,
                    isEnd,
                    isStart,
                    isWall,
                    isMousePressed,
                  } = node;
                  return (
                    <Node
                      key={nodIdx}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isEnd={isEnd}
                      isWall={isWall}
                      isMousePressed={isMousePressed}
                      onMouseDown={(row, col) => this.MouseDown(row, col)}
                      onMouseEnter={(row, col) => this.MouseHold(row, col)}
                      onMouseUp={() => this.MouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
export default GridDisplay;

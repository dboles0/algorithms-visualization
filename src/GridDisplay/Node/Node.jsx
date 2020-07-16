import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { 
      col, 
      row, 
      isEnd, 
      isStart, 
      isWall, 
      onMouseDown, 
      onMouseEnter, 
      onMouseUp, 
    } = this.props;
    const extraclassName = isEnd
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div id={`node-${row}-${col}`} 
      className={`node ${extraclassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
      ></div>
    );
  }
}

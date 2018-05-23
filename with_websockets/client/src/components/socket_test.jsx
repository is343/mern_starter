import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class SocketTest extends Component {
  constructor() {
    super();

    this.state = {
      endpoint: "http://localhost:5000/",
      color: "white",
    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", this.state.color); // change 'red' to this.state.color
  };

  setColor = color => {
    this.setState({ color });
  };

  render() {
    // testing for socket connections

    const socket = socketIOClient(this.state.endpoint);
    socket.on("change color", col => {
      document.body.style.backgroundColor = col;
    });

    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send()}>Change Color</button>
        <button id="blue" onClick={() => this.setColor("blue")}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor("red")}>
          Red
        </button>
      </div>
    );
  }
}

export default SocketTest;

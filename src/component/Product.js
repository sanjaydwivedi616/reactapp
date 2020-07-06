import React, { Component } from "react";

class Product extends Component {

  state = {
    name: "sanjay"
  }

  changeState = () => {
    this.setState({
      name: "mohan"
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState)
      console.log("this is should component");
    return true
  }

  render() {
    return (
      <>
        <p>{this.state.name}</p>
        <button onClick={this.changeState}>Click me!!!</button>
      </>
    )
  }
}

export default Product;

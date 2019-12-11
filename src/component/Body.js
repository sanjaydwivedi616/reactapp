import React, { Component } from 'react';

class Body extends Component {
  constructor() {
    super();
    this.state = {
      massage: 'This is test massage'
    };
  }
  changetext() {
    this.setState({
      massage: 'Change massage'
    });
  }
  render() {
    return (
      <div>
        <h1> Hello {this.state.massage}</h1>
        <button className='btn btn-primary' onClick={() => this.changetext()}>
          Click Me!!
        </button>
      </div>
    );
  }
}

export default Body;

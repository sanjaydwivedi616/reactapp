import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux"
import { changeState } from "./store/action/action"

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate: "",
      hello: "",
      userName: ""
    };
  }
  fromDateChange = fromDate => {
    this.setState({
      fromDate: fromDate,
      toDate: "",
    });
    const fromhello = fromDate;
    const tohello = new Date();
    const diffTime = Math.abs(tohello - fromhello);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    alert(diffDays)
    this.setState({
      hello: diffDays - 1
    });

  }
  toDateChange = toDate => {
    this.setState({
      toDate: toDate
    });
  };
  changeState = () => {
    if(this.state.userName === ""){
      return false
    }
    this.props.changeStateToReducer(this.state.userName)
    this.setState({
      userName: ""
    })
  }
  changeUserInput(event) {
    this.setState({
      userName: event.target.value
    })
  }
  render() {
    return (
      <div>
        <div>
          <p>{this.props.userNames} and my age is {this.props.userAge} </p>
          <input type="text" value={this.state.userName} onChange={this.changeUserInput.bind(this)} />
          <button onClick={this.changeState} >Change State</button>
        </div>

        <DatePicker className="form-control" dateFormat="yyyy/MM/dd"
          selected={this.state.fromDate}
          onChange={this.fromDateChange} maxDate={new Date()}
          minDate={addDays(new Date(), -180)}
          placeholderText="YYYY/MM/DD"
        />

        <DatePicker className="form-control" dateFormat="yyyy/MM/dd"
          selected={this.state.toDate}
          onChange={this.toDateChange} maxDate={new Date()}
          minDate={addDays(new Date(), -this.state.hello)}
          placeholderText="YYYY/MM/DD"
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return ({
    userNames: state.rootReducer.userName,
    userAge: state.rootReducer.age,
  })
}

function mapdispatchToProps(dispatch) {
  return ({
    changeStateToReducer: (updatedUserName) => {
      dispatch(changeState(updatedUserName))
    }
  })
}

export default connect(mapStateToProps, mapdispatchToProps)(Product);

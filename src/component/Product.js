import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate: "",
      hello: ""
    };
  }
  fromDateChange = fromDate => {
    this.setState({
      fromDate: fromDate,
      toDate : "",
    });
    const fromhello = fromDate;
    const tohello = new Date();
    const diffTime = Math.abs(tohello - fromhello);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    alert(diffDays)
    this.setState({
      hello : diffDays-1
    });
    
  }
  toDateChange = toDate => {
    this.setState({
      toDate: toDate
    });
  };
  render() {
    return (
      <div>

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

export default Product;

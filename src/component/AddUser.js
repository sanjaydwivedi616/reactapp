import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      NewUserDOB: "",
      fromDate: new Date(),
      newUserGender: "",
      newUserNationality: "",
      editing: false,
    };
  }

  addUserInTheList = (event) => {
    event.preventDefault();
    const user = this.state;
    if (user.newUserName === "" || user.newUserEmail === "" || user.newUserMobile === "") {
      return false
    }
    this.state.users.map(elem => {
      if (elem.email === user.newUserEmail) {
        return false;
      }
    });
    let UserDOB = this.state.fromDate.getDate() + "/" + (this.state.fromDate.getMonth() + 1) + "/" + this.state.fromDate.getFullYear();
    axios.post("http://localhost:3333/todos/", {
      id: Math.random(),
      name: this.state.newUserName,
      email: this.state.newUserEmail,
      mobile: this.state.newUserMobile,
      DOB: UserDOB,
      gender: this.state.newUserGender,
      address: {
        nationality: this.state.newUserNationality,
        state: "Karnataka",
        city: "Bangalore",
        street: "Kulas Light",
        zipcode: "92998",
      },
      edited: false,
    }).then(result => {
      this.setState({
        newUserName: "",
        newUserEmail: "",
        newUserMobile: "",
        NewUserDOB: "",
        newUserGender: "",
        newUserNationality: "",
      })
    })
  }

  changeUserInput = (e) => {
    const stringValidetion = /^[a-zA-Z\b]+$/;
    const numberValidetion = /^[0-9\b]+$/;
    let feildName = [e.target.name]
    if (feildName == "newUserName") {
      if (e.target.value === '' || stringValidetion.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value.substr(0, 10)
        })
      }
    } else if (feildName == "newUserMobile") {
      if (e.target.value === '' || numberValidetion.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value.substr(0, 10)
        })
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  DOBChange = fromDate => {
    this.setState({
      NewUserDOB: fromDate,
      fromDate: fromDate
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addUserInTheList}>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <input className="form-control" type="text" name="newUserName" value={this.state.newUserName}
                    onChange={this.changeUserInput} placeholder="Name"
                  />
                </td>
                <td>
                  <input className="form-control" type="Email" name="newUserEmail" value={this.state.newUserEmail}
                    onChange={this.changeUserInput} placeholder="Email" />
                </td>
                <td>
                  <input className="form-control" type="text" name="newUserMobile" value={this.state.newUserMobile}
                    onChange={this.changeUserInput} placeholder="Mobile" />
                </td>
                <td>
                  <DatePicker className="form-control" dateFormat="dd/MM/yyyy"
                    selected={this.state.NewUserDOB}
                    onChange={this.DOBChange} maxDate={new Date()}
                    placeholderText="DD/MM/YYYY"
                  />
                </td>
                <td>
                  <select className="form-control" name="newUserGender"
                    value={this.state.newUserGender}
                    onChange={this.changeUserInput}>
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </td>
                <td>
                  <select className="form-control" name="newUserNationality"
                    value={this.state.newUserNationality}
                    onChange={this.changeUserInput}>
                    <option value=""></option>
                    <option value="Indian">Indian</option>
                    <option value="Denmark">Denmark</option>
                    <option value="British">British</option>
                    <option value="Estonian">Estonian</option>
                    <option value="Finnish">Finnish</option>
                    <option value="Iceland">Iceland</option>
                  </select>
                </td>
                <td>
                  <button type="submit">Add User</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default AddUser;
import React, { Component } from 'react'
import axios from "axios";

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      newUserAge: ""
    };
  }

  addUserInTheList = (event) => {
    event.preventDefault();
    const user = this.state;
    if (user.newUserName === "" || user.newUserEmail === "" || user.newUserMobile === "") {
      return false
    }
    axios.post("http://localhost:3333/todos/", {
      id: Math.random(),
      name: this.state.newUserName,
      email: this.state.newUserEmail,
      mobile: this.state.newUserMobile,
      age: this.state.newUserAge,
    }).then(result => {
      this.setState({
        newUserName: "",
        newUserEmail: "",
        newUserMobile: "",
        newUserAge: "",
      })
    })
  }
  changeUserInput = (e) => {
    const stringValidetion = /^[a-z,A-Z,\b]+$/;
    const numberValidetion = /^[0-9,\b]+$/;
    let txt = [e.target.name]
    if (txt == "newUserName") {
      if (e.target.value === '' || stringValidetion.test(e.target.value)) {
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

  render() {
    return (
      <form onSubmit={this.addUserInTheList}>
        <table className="table">
          <tr>
            <td>
              <input type="text" name="newUserName" value={this.state.newUserName}
                onChange={this.changeUserInput} placeholder="Name"
              />
            </td>
            <td>
              <input type="Email" name="newUserEmail" value={this.state.newUserEmail}
                onChange={this.changeUserInput} placeholder="Email" />
            </td>
            <td>
              <input type="text" name="newUserMobile" value={this.state.newUserMobile}
                onChange={this.changeUserInput} placeholder="Mobile" />
            </td>
            <td>
              <input type="number" name="newUserAge" value={this.state.newUserAge}
                onChange={this.changeUserInput} placeholder="Age"
              />
            </td>
            <td>
              <button type="submit" >Add User</button>
            </td>
          </tr>
        </table>
      </form>
    )
  }
}

export default AddUserForm

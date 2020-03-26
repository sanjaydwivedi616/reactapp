import React, { Component } from "react";
import { connect } from "react-redux"
import { AddUser, RemoveUser, EditUser } from "./store/action/action"
import axios from "axios";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Product extends Component {
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

  async getUserList() {
    let result = await axios.get(`http://localhost:3333/todos`);
    this.setState({
      users: result.data
    })
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
      nationality: this.state.newUserNationality,
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
      this.getUserList()
    })
  }

  deleteUserToList = (id) => {
    const userDelete = window.confirm("Do you want to Delete this user?");
    if (userDelete === true) {
      axios.delete(`http://localhost:3333/todos/${id}`).then(result => {
        this.setState({
          newUserName: "",
          newUserEmail: "",
          newUserMobile: "",
          NewUserDOB: "",
          newUserGender: "",
          newUserNationality: "",
          UpdateId: "",
          editing: !this.state.editing,
        })
        this.getUserList();
      })
    } else {
      return false;
    }
  }

  editUserToList = (id) => {
    this.state.users.map(user => {
      if (id === user.id) {
        this.setState({
          editing: true,
          newUserName: user.name,
          newUserEmail: user.email,
          newUserMobile: user.mobile,
          NewUserDOB: user.DOB,
          newUserGender: user.gender,
          newUserNationality: user.nationality,
          UpdateId: user.id
        })
      }
    })
  }
  cancleEditUser = () => {
    this.setState({
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      NewUserDOB: "",
      newUserGender: "",
      newUserNationality: "",
      editing: false,
    })
  }
  EditUserInTheList = (event) => {
    event.preventDefault();
    let id = this.state.UpdateId;
    let updatedDOB = this.state.fromDate.getDate() + "/" + (this.state.fromDate.getMonth() + 1) + "/" + this.state.fromDate.getFullYear();

    axios.put(`http://localhost:3333/todos/${id}`, {
      id: id,
      name: this.state.newUserName,
      email: this.state.newUserEmail,
      mobile: this.state.newUserMobile,
      DOB: updatedDOB,
      gender: this.state.newUserGender,
      nationality: this.state.newUserNationality,
      edited: true,
    }).then(result => {
      this.setState({
        newUserName: "",
        newUserEmail: "",
        newUserMobile: "",
        NewUserDOB: "",
        newUserGender: "",
        newUserNationality: "",
        UpdateId: "",
        editing: !this.state.editing,
      })
      this.getUserList()
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

  componentDidMount() {
    this.getUserList();
  }

  render() {
    const { users, editing } = this.state;
    return (
      <div>
        {editing ?
          <form onSubmit={this.EditUserInTheList}>
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
                      selected={this.state.fromDate}
                      value={this.state.NewUserDOB}
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
                    <button type="submit" >Update User</button>
                    <button className="delete" onClick={this.cancleEditUser}>Cancle</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          :
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
                      <option value="male">Male</option>
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
        }
        <table className="table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Nationality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}.</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.DOB}</td>
                  <td>{user.gender}</td>
                  <td>{user.nationality}</td>
                  <td>
                    <button disabled={user.edited} onClick={() => this.editUserToList(user.id)}>Edit</button>
                    <button className="delete" onClick={() => this.deleteUserToList(user.id)}>X</button>
                  </td>
                </tr>
              )
            }) :
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>No recored found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    users: state.users,
  })
}

function mapdispatchToProps(dispatch) {
  return ({
    addUserData: (updateduserName) => {
      dispatch(AddUser(updateduserName))
    },
    removeData: (index) => {
      dispatch(RemoveUser(index))
    },
    editData: (index) => {
      dispatch(EditUser(index))
    }
  })
}

export default connect(mapStateToProps, mapdispatchToProps)(Product);

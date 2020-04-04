import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux"
import { fetchUsers } from '../redux'
import AddUser from "./AddUser"

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
  getUserList() {
    this.props.fetchUsers();
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
          editing: false
        })
        this.getUserList();
      })
    } else {
      return false;
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userData.users.length !== this.props.userData.users.length) {
      this.props.fetchUsers();
    } else {
      return
    }
    //this.props.fetchUsers();
  }

  editUserToList = (id) => {
    this.props.userData.users.map(user => {
      if (id === user.id) {
        this.setState({
          editing: true,
          newUserName: user.name,
          newUserEmail: user.email,
          newUserMobile: user.mobile,
          NewUserDOB: user.DOB,
          newUserGender: user.gender,
          newUserNationality: user.address.nationality,
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
        editing: false,
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

  componentDidUpdate(prevProps) {
    if (prevProps.userData.users.length !== this.props.userData.users.length) {
      this.props.fetchUsers();
    }
  }

  render() {
    const { editing } = this.state;
    const { userData } = this.props
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
          <AddUser userlist={userData} />
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
            {userData.users.length > 0 ? userData.users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{index + 1}.</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.DOB}</td>
                  <td>{user.gender}</td>
                  <td>{user.address.nationality}</td>
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

const mapStateToProps = state => {
  return {
    userData: state.user,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);

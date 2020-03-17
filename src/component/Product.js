import React, { Component } from "react";
import { connect } from "react-redux"
import { AddUser, RemoveUser } from "./store/action/action"

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ""
    };
  }

  updateUserList = (event) => {
    event.preventDefault();
    if (this.state.users === "") {
      return false
    }
    this.props.addUserData(this.state.users)
    this.setState({
      users: ""
    })
  }

  removeItems = (index) => {
    const userDelete = window.confirm("Do you want Delete this user ?");
    if (userDelete == true) {
      this.props.removeData(index)
    } else {
      return false;
    }
  }
  changeUserInput(event) {
    this.setState({
      users: event.target.value
    })
  }
  validation(){
    alert(12123)
  }
  render() {
    return (
      <div>
        <form onSubmit={this.updateUserList}>
          <input type="text" value={this.state.users} onChange={this.changeUserInput.bind(this)} onKeyPress={()=>this.validation()}/>
          <button type="submit" >Add User</button>
        </form>
        <ul>
          {this.props.users.map((item, index) => {
            return (
              <li key={index}>{item} <button onClick={() => this.removeItems(index)}>X</button></li>
            )
          })}
        </ul>
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
    }
  })
}

export default connect(mapStateToProps, mapdispatchToProps)(Product);

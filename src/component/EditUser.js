import React, { Component } from 'react'

class EditUserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newUserName: "",
      newUserEmail: "",
      newUserMobile: "",
      newUserAge: "",
      EditUserForm: this.props
    };
  }
  addUserInTheList = (event) => {
    event.preventDefault()
    this.setState({
      EditUserForm: false
    })
  }

  render() {
    return (
      <form onSubmit={this.addUserInTheList} >
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
              <button type="submit" >Update User</button>
              <button>Cancle</button>
            </td>
          </tr>
        </table>
      </form>
    )
  }
}
export default EditUserForm

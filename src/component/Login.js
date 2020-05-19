import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {

  state = {
    email: "",
    password: "",
  }

  changeUserInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  userLoginValidetion = (e) => {
    e.preventDefault()
    const userCredential = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(userCredential)
    axios.post("http://localhost:2000/login", userCredential).then(responce => {
      console.log(responce.data);
    })
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="login-form">
        <form className="form-horizontal" onSubmit={this.userLoginValidetion}>
          <div className="form-group">
            <label className="control-label ">Email</label>
            <input type="email" className="form-control" placeholder="Email" name="email"
              value={email} onChange={this.changeUserInput} />
          </div>
          <div className="form-group">
            <label className="control-label ">Password</label>
            <input type="password" className="form-control" placeholder="Password" name="password"
              value={password} onChange={this.changeUserInput} />
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2">
              <div className="checkbox">
                <label><input type="checkbox" name="remember" /> Remember me</label>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-5">
              <button type="submit">Submit</button>
            </div>
            <div className="col-sm-5">
              <Link to="/Users">Sign Up User</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


export default Login;
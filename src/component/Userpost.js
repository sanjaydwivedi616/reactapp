import React, { Component } from "react";
import axios from "axios";

class Userpost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosts: [],
      errormsg : ''
    };
  }
  componentDidMount() {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then(response => {
        console.log(response);
        this.setState({ userPosts: response.data.data });
      })
      .catch(error => {
        this.setState({errormsg: "We are not fatching any data"});
      });
  }
  render() {  
    const { userPosts,errormsg } = this.state;
    return (
      <div className="container">
        {userPosts.length
          ? userPosts.map(userPost => (
              <div className="userData" key={userPost.id}>
                <img src={userPost.avatar}></img>
                <p><b>{userPost.first_name} {userPost.last_name}</b></p>
                <p>{userPost.email}</p>
              </div>
            ))
          : null}
          { errormsg ? <div className="errormsg">{errormsg}</div>: null }
      </div>
    );
  }
}

export default Userpost;

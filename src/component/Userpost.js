import React, { Component } from 'react';
import axios from 'axios';

class Userpost extends Component {
  state = {
    posts: []
  };

  userPostList = id => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(resulet => {
        this.setState({
          posts: resulet.data
        });
      });
  };

  componentDidMount() {
    const { user } = this.props;
    this.userPostList(user.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.userPostList(this.props.user.id);
    }
  }
  render() {
    const { posts } = this.state;
    return (
      <div>
        {posts.map(post => {
          return (
            <div key={post.id} class='card'>
              <div class='card-body'>
                <h5 class='card-title'>{post.title}</h5>
                <hr />
                <p class='card-text'>{post.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Userpost;

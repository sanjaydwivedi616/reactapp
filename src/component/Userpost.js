import React, { Component } from 'react';
import axios from 'axios';

class Userpost extends Component {
  state = {
    posts: [],
    loader: false
  };

  userPostList = id => {
    this.setState({
      loader: true
    })
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(resulet => {
        this.setState({
          posts: resulet.data,
          loader: false
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
    const { posts, loader } = this.state;
    return (
      <div>
        {loader ? (
          `Loadding post for ${this.props.user.name}...`
        ) : (
            <div>
              {posts.map(post => {
                return (
                  <div key={post.id} className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>{post.title}</h5>
                      <hr />
                      <p className='card-text'>{post.body}</p>
                    </div>
                  </div>

                );
              })}
            </div>
          )}
      </div>
    );
  }
}
export default Userpost;

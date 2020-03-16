import React, { Component } from 'react';
import axios from 'axios';

class Userpost extends Component {
  state = {
    posts: [],
    loader: false
  };
  
  userPostList = async (id) => {
    this.setState({
      loader: true
    })
    let res = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    let  postData  = res.data;
    this.setState({
      posts: postData,
      loader: false
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

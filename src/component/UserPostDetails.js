import React, { Component, lazy, Suspense } from 'react';
import axios from 'axios';
const UserPost = lazy(() => import("./Userpost"));

class UserPostDetails extends Component {
  state = {
    users: [],
    selectedUser: null
  };
  componentDidMount() {
    this.UserPostsGet()
  };
  async UserPostsGet() {
    let responce = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let data = responce.data;
    this.setState({
      users: data,
      selectedUser: responce.data[0]
    });
  }
  selectedList = user => {
    this.setState({
      selectedUser: user
    });
  }
  render() {
    const { users, selectedUser } = this.state;
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-6'>
            {users.length === 0 ? (
              <div className="loaderBackground">Loadding...</div>
            ) : (
                <ul className='list-group'>
                  {users.map(user => {
                    return (
                      <li
                        className={`list-group-item 
                         ${user.id === selectedUser.id ? 'active' : null}`}
                        key={user.id}
                        onClick={() => this.selectedList(user)}
                      >
                        {user.name}
                      </li>
                    );
                  })}
                </ul>
              )}
          </div>
          <div className='col-sm-6'>
            <Suspense fallback={<div>Loading...</div>}>
              {selectedUser !== null ? <UserPost user={selectedUser} /> : null}
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPostDetails;

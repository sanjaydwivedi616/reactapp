import React, { Component } from 'react';
import axios from "axios";
import UserPost from "./UserPost"

class UserPostDetails extends Component {
    state = {
        users: [],
        selectedUser: null
    }
    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`).then(result => {
            this.setState({
                users: result.data,
                selectedUser: result.data[0]
            })
        })
    }
    selectedList = (user) => {
        this.setState({
            selectedUser: user
        })
    }

    render() {
        const { users, selectedUser } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        {users.length === 0 ? ("Loadding...") :
                            <ul className="list-group">{users.map(user => {
                                return (
                                    <li className={`list-group-item 
                                     ${user.id === selectedUser.id ? "active" : null}`} key={user.id}
                                        onClick={() => this.selectedList(user)}>{user.name}</li>
                                )
                            })}
                            </ul>
                        }
                    </div>
                    <div className="col-sm-6">{selectedUser !== null ? <UserPost user={selectedUser} /> : null}</div>
                </div>
            </div>
        );
    }
}

export default UserPostDetails;
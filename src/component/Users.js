import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'

function UsersContainer({ userData, fetchUsers }) {

  function viewUserDetails(id) {
    alert(id)
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.errorMass}</h2>
  ) : (
        <div>
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
                    <td>{user.nationality}</td>
                    <td>
                      <button onClick={() => viewUserDetails(user.id)}>View Details</button>
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
      )
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
  mapDispatchToProps
)(UsersContainer)

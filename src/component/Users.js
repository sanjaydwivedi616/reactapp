import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../redux'


function UsersContainer({ userData, fetchUsers }) {

  const [popUpModel, openModel] = useState(true);
  const [selectedId, setSelectedId] = useState(0);

  let viewUserDetails = (id) => {
    openModel(false);
    setSelectedId(id)
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
                    <td>{user.address.nationality}</td>
                    <td>
                      <button data-toggle="modal" data-target="#myModal" onClick={() => viewUserDetails(user.id)}>View Details</button>
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

          <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 style={{ color: "#FFF" }}>USER INFO</h6>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                  {userData.users.filter(users => users.id == selectedId).map(filteredPerson => (
                    <table className="table">
                      <tr>
                        <td>Name</td>
                        <td>{filteredPerson.name}</td>
                        <td>Email</td>
                        <td>{filteredPerson.email}</td>
                        <td>Gender</td>
                        <td>{filteredPerson.gender}</td>
                      </tr>
                      <tr>
                        <td>DOB</td>
                        <td>{filteredPerson.DOB}</td>
                        <td>Mobile</td>
                        <td>{filteredPerson.mobile}</td>
                        <td>Country</td>
                        <td>{filteredPerson.address.nationality}</td>
                      </tr>

                      <tr>
                        <td>State</td>
                        <td>{filteredPerson.address.state}</td>
                        <td>City</td>
                        <td>{filteredPerson.address.city}</td>
                        <td>Street/Zip</td>
                        <td>{filteredPerson.address.street} {filteredPerson.address.zipcode}</td>
                      </tr>
                    </table>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
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

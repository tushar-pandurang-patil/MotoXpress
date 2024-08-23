import React, { useState, useEffect } from 'react';
import { getUsers, getUserProfiles } from '../services/api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUsers();
        const userProfileResponse = await getUserProfiles();
        setUsers(userResponse.data);
        setUserProfiles(userProfileResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const findUserProfile = (userId) => {
    return userProfiles.find(profile => profile.userId === userId) || {};
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Users Details</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Full Name</th>
            <th>Email ID</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>City</th>
            <th>DL Number</th>
            <th>Account Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const profile = findUserProfile(user.userId);
            console.log(profile.city);  // Debugging line
            return (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userFullName}</td>
                <td>{user.emailId}</td>
                <td>{user.role}</td>
                <td>{profile.phoneNumber || 'N/A'}</td>
                <td>{profile.address || 'N/A'}</td>
                <td>{profile.city?.cityName || 'N/A'}</td>
                <td>{profile.dlnumber || 'N/A'}</td>
                <td>{profile.approvalCompleted === 1 ? 'Approved' : 'Pending'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

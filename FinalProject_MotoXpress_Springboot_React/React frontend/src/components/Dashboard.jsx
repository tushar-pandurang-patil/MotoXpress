import React, { useState, useEffect } from 'react';
import Bookings from './Bookings';

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Simulate fetching the logged-in user with their role
    fetch('/api/currentUser')
      .then((response) => response.json())
      .then((data) => setLoggedInUser(data))
      .catch((error) => console.error('Error fetching user:', error));
  }, []);

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  const { role } = loggedInUser;

  return (
    <div>
      <h1>Welcome, {loggedInUser.username}</h1>

      {role === 'CUSTOMER' && <Bookings user={loggedInUser} />}
      
      {role === 'ADMIN' && (
        <div>
          <h2>Admin Panel</h2>
          {/* Admin-specific functionality */}
        </div>
      )}

      {role === 'APPROVER' && (
        <div>
          <h2>Approver Dashboard</h2>
          {/* Approver-specific functionality */}
        </div>
      )}

      {role === 'OBSERVER' && (
        <div>
          <h2>Observer View</h2>
          {/* Observer-specific functionality */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

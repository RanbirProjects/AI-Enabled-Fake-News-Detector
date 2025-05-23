import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <>
          <p className="text-lg">Welcome, {user.name}! Your role is: {user.role}</p>
          <button
            onClick={logout}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-lg">Please log in to view your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;
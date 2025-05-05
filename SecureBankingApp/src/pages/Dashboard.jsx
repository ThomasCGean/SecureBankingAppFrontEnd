// SecureBankingApp/src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ signOut, user }) {
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <nav>
        <ul>
          <li><Link to="/statement">View Statement</Link></li>
          <li><Link to="/profile">Edit Profile</Link></li>
          <li><Link to="/transfer">Transfer Funds</Link></li>
          <li><Link to="/transactions">Transaction History</Link></li>
        </ul>
      </nav>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

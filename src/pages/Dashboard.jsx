// SecureBankingApp/src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // ✅ Import context

export default function Dashboard() {
  const { user, loadingUser, signOut } = useUser(); // ✅ Include signOut

  if (loadingUser) return <div>Loading dashboard...</div>;
  if (!user) return <div>Error: User not available.</div>; // Defensive fallback

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

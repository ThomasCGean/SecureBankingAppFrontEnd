// SecureBankingApp/src/pages/StatementView.jsx
import React from 'react';

export default function StatementView({ user }) {
  return (
    <div>
      <h2>Statement for {user.username}</h2>
      <p>[Placeholder for statement retrieval from Lambda]</p>
    </div>
  );
}

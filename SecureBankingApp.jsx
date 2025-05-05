// SecureBankingApp/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

import Dashboard from './pages/Dashboard';
import StatementView from './pages/StatementView';
import ProfileEdit from './pages/ProfileEdit';
import TransferForm from './pages/TransferForm';
import TransactionHistory from './pages/TransactionHistory';

Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator loginMechanisms={["username"]}>
      {({ signOut, user }) => (
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard signOut={signOut} user={user} />} />
            <Route path="/statement" element={<StatementView user={user} />} />
            <Route path="/profile" element={<ProfileEdit user={user} />} />
            <Route path="/transfer" element={<TransferForm user={user} />} />
            <Route path="/transactions" element={<TransactionHistory user={user} />} />
          </Routes>
        </Router>
      )}
    </Authenticator>
  );
}

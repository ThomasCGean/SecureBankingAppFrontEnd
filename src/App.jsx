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
import { UserProvider } from './context/UserContext'; // ✅ Import context

Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator loginMechanisms={["username"]}>
      {({ signOut, user }) => (
        // ✅ Pass signOut into context
        <UserProvider user={user} signOut={signOut}>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/statement" element={<StatementView />} />
              <Route path="/profile" element={<ProfileEdit />} />
              <Route path="/transfer" element={<TransferForm />} />
              <Route path="/transactions" element={<TransactionHistory />} />
            </Routes>
          </Router>
        </UserProvider>
      )}
    </Authenticator>
  );
}

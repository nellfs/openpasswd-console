import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import Home from './containers/Home';
import Login from './containers/Login/index';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './containers/Register';
import Account from './containers/Account';
import ForgotPassword from './containers/PasswordRecovery/ForgotPassword';
import RecoveryPassword from './containers/PasswordRecovery/RecoveryPassword';
class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/recovery_password" element={<RecoveryPassword />} />
        <Route
          path="/group/:name"
          element={
            <RequireAuth>
              <Account />
            </RequireAuth>
          }
        />

        <Route
          path="*"
          element={
            <RequireAuth>
              <Layout>
                <Home />
              </Layout>
            </RequireAuth>
          }
        />
      </Routes>

    );
  }
}

export default App;

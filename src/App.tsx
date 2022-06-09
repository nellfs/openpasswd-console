import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import Home from './containers/Home';
import Login from './containers/Login/index';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './containers/Register';
import Account from './containers/Account';
import PasswordRecovery from './containers/PasswordRecovery';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password_recovery" element={<PasswordRecovery />} />

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

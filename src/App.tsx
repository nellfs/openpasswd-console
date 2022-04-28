import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './components/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import RequireAuth from './components/Auth/RequireAuth';
import Register from './containers/Register';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </Layout>
    );
  }
}

export default App;

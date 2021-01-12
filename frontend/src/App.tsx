import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import AllPosts from './components/Posts/AllPosts';
import Dashboard from './components/User/Dashboard';
import Login from './components/User/Login';
import Signup from './components/User/Signup';

function App() {
  return (
    <Router>
      <Header />
      <Route />
      <Route />
      <Route />

      {/* Post Routes */}
      <div className="App">
        <AllPosts />
        <Route />
        <Route />
      </div>

    </Router>
  )
}

export default App;

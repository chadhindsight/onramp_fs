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

      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />

      {/* Post Routes */}
      <div className="App">
        <Route path="/" component={AllPosts} exact />
        <Route />
      </div>

    </Router>
  )
}

export default App;

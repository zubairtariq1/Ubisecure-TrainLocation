import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';

function App() {
  return (
      <Router>
        <div className="App">
          <h1>Train App</h1>
          <Routes>
            <Route path="/" element={<UserRegistration/>} />
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/profile" element={<UserProfile/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

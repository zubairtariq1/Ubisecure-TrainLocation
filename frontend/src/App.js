import React from 'react';
import AuthPage from './components/authPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserProfile from './components/profilePage'

function App() {
    return (
        <Router>
            <div className="App">
                <h2>Welcome to Train Tracker App!</h2>
                <h4>Choose from the below</h4>
                <Routes>
                    <Route path="/login" element={<AuthPage action="login" />} />
                    <Route path="/register" element={<AuthPage action="register" />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Routes>
                <nav>
                    <ul>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </Router>
    );
}

export default App;


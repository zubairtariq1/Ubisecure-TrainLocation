import React, { useState } from 'react';
import axios from './axiosConfig';

function AuthPage() {
    const [action, setAction] = useState('register'); // 'register' or 'login'
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth', {
                username,
                email,
                password,
                action, // Send the current action to the backend
            });
            console.log('Authentication successful:', response.data);
            // Perform appropriate action based on response, e.g., redirect to profile
        } catch (error) {
            console.error('Authentication failed:', error.response.data.message);
        }
    };

    return (
        <div>
            <h2>{action === 'register' ? 'User Registration' : 'User Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {action === 'register' ? 'Register' : 'Login'}
                </button>
            </form>
            <div>
                {action === 'register' ? (
                    <p>
                        Already have an account?{' '}
                        <span onClick={() => setAction('login')}>Login by clicking <strong>here</strong></span>
                    </p>
                ) : (
                    <p>
                        New user?{' '}
                        <span onClick={() => setAction('register')}>Register by clicking <strong>here</strong></span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default AuthPage;

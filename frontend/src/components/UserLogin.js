import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from './axiosConfig';

const googleClientID = process.env.GOOGLE_CLIENTID;

function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/login', { email, password });
            console.log('User logged in successfully');
        } catch (error) {
            console.error('Login failed:', error.response.data.message);
        }
    };

    const responseGoogle = async (response) => {
        try {
            const tokenId = response.tokenId;
            await axios.post('/api/login/google', { tokenId });
            console.log('Google Login Successful');
        } catch (error) {
            console.error('Google login failed:', error.response.data.message);
        }
    };

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Login</button>
            </form>
            <div>
                <h3>Login via Google</h3>
                <GoogleLogin
                    disabled={false}
                    clientID={googleClientID}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
}
export default UserLogin;

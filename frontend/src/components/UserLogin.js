// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

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
            console.log('Google login successful');
        } catch (error) {
            console.error('Google login failed:', error.response.data.message);
        }
    };

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={handleLogin}>
                <button type="submit">Login</button>
            </form>
            <div>
                <h3>Login via Google</h3>
                <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID"
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

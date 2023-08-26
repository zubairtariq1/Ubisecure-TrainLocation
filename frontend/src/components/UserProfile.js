import React, { useEffect, useState } from 'react';
import axios from './axiosConfig';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/profile');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
}

export default UserProfile;

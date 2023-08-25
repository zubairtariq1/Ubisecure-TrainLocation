const bcrypt = require('bcrypt');
const User = require('../models/User');

const userController = {
    registerUser: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed' });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            res.status(500).json({ message: 'Login failed' });
        }
    },

    getUserProfile: async (req, res) => {
        const user = req.user;

        if (user) {
            res.status(200).json({
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(401).json({ message: 'User not authenticated' });
        }
    },
};

module.exports = userController;


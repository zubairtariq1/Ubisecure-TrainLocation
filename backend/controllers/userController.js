const bcrypt = require('bcrypt');
const User = require('../models/User');

const userController = {
    registerUser: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            res.status(201).json({ message: 'Registration Successful' });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed' });
        }
    },
};

module.exports = userController;

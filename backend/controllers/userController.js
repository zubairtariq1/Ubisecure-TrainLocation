const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userController = {
    // Handle combined user registration and login
    registerOrLogin: async (req, res) => {
        const { username, email, password, action } = req.body;

        try {
            if (action === 'register') {
                // Handle user registration
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ message: 'Email already in use' });
                }

                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
                const newUser = new User({ username, email, password: hashedPassword });
                await newUser.save();

                res.status(201).json({ message: 'Registration successful' });
            } else if (action === 'login') {
                // Handle user login
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(400).json({ message: 'Invalid action' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = userController;

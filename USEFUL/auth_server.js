const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let users = {}; // In-memory storage for users

// Sign Up Route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    if (users[username]) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    users[username] = password;
    res.json({ message: 'Sign Up Successful' });
});

// Sign In Route
app.post('/signin', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    if (!users[username] || users[username] !== password) {
        return res.status(401).json({ message: 'Invalid Credentials' });
    }

    res.json({ message: 'Sign In Successful' });
});

// Start the Server
app.listen(3000, () => console.log('Server running on port 3000'));

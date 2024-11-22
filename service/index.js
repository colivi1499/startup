const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));


const express = require('express');
const app = express(); // Initialize app first

// Middleware
app.use(express.json()); // For parsing JSON
app.use(express.static('public')); // Serve static files from the 'public' directory

// Mock user data
const mockUsers = [
    { username: "testuser", password: "password123" }, // Example user
];

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = mockUsers.find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).json({ message: "Login successful", token: "mockToken123" });
    } else {
        res.status(401).json({ message: "Invalid username or password" });
    }
});


// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




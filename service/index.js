const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
const app = express();

app.use(express.json());

// Example Existing Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the Simon Service!');
});

// New Endpoints

// 1. Create a New Resource
app.post('/api/resources', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    const newResource = {
        id: uuidv4(),
        name,
        description,
        createdAt: new Date()
    };

    // Logic to save newResource in the database or memory can be added here.

    res.status(201).json(newResource);
});

// 2. Get All Resources
app.get('/api/resources', (req, res) => {
    // Fetch resources from database or memory.
    const resources = [
        { id: '1', name: 'Resource 1', description: 'First resource' },
        { id: '2', name: 'Resource 2', description: 'Second resource' }
    ];

    res.status(200).json(resources);
});

// 3. Get a Single Resource by ID
app.get('/api/resources/:id', (req, res) => {
    const { id } = req.params;

    // Logic to fetch the resource from database or memory can be added here.
    const resource = { id, name: 'Resource 1', description: 'First resource' };

    if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
    }

    res.status(200).json(resource);
});

// 4. Update a Resource by ID
app.put('/api/resources/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required.' });
    }

    // Logic to update the resource in the database or memory.

    const updatedResource = { id, name, description };

    res.status(200).json(updatedResource);
});

// 5. Delete a Resource by ID
app.delete('/api/resources/:id', (req, res) => {
    const { id } = req.params;

    // Logic to delete the resource from database or memory.

    res.status(204).send();
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

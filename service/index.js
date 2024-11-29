
const express = require('express');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000; 


app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.send('Welcome to the HTTP service using Express!');
});


app.get('/api/items', (req, res) => {
    const items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ];
    res.json(items);
});


app.get('/api/items/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, name: `Item ${id}` });
});


app.post('/api/items', (req, res) => {
    const newItem = req.body;
    newItem.id = Math.random().toString(36).substr(2, 9); 
    res.status(201).json(newItem);
});


app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    res.json({ message: `Item ${id} updated`, updates });
});

app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Item ${id} deleted` });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDB } = require('./database');

const app = express();
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const db = await connectToDB();
    const user = await db.collection('users').findOne({ username, password });

    if (user) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const db = await connectToDB();
      const existingUser = await db.collection('users').findOne({ username });
  
      if (existingUser) {
        return res.status(400).send({ message: 'User already exists' });
      }
  
      await db.collection('users').insertOne({ username, password });
      res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
    }
  });

const PORT = process.argv.length > 2 ? process.argv[2] : 3000;
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

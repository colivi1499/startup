const express = require('express');
const { connectToDB } = require('./database');
const bcrypt = require('bcrypt');
const app = express();

// Use built-in JSON body parser middleware
app.use(express.json());

app.use(express.static('public'));

app.set('trust proxy', true);

const cors = require('cors');
app.use(cors()); // Allow all origins

// Router for service endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Login endpoint
apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Login request received:', { username, password });

    const db = await connectToDB();
    console.log('Connected to database.');

    const user = await db.collection('user').findOne({ username });
    console.log('User found:', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log('Login successful');
      res.status(200).send({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials');
      res.status(401).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// Define the signup route
apiRouter.post('/signup', async (req, res, next) => {
  try {
    console.log('Signup request received:', req.body);

    const db = await connectToDB();
    console.log('Connected to database.');

    const { username, password } = req.body;

    if (!username || !password) {
      console.error('Missing username or password');
      return res.status(400).send({ message: 'Username and password are required.' });
    }

    const existingUser = await db.collection('user').findOne({ username });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      console.log('User already exists.');
      return res.status(400).send({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully.');

    const result = await db.collection('user').insertOne({ username, password: hashedPassword });
    console.log('Insert result:', result);

    if (result.acknowledged) {
      console.log('User inserted successfully.');
      res.status(201).send({ message: 'User registered successfully.' });
    } else {
      throw new Error('Failed to insert user into database.');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

apiRouter.post('/save-rating', async (req, res) => {
  const { username, location, menuItem, rating } = req.body;

  if (!username || !location || !menuItem || !rating) {
    console.error('Missing required fields for saving rating');
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    console.log('Save rating request received:', { username, location, menuItem, rating });

    const db = await connectToDB();
    console.log('Connected to database.');

    // Save the rating in the "ratings" collection
    const result = await db.collection('ratings').insertOne({
      username,
      location,
      menuItem,
      rating,
      timestamp: new Date(),
    });

    console.log('Rating saved:', result);
    res.status(201).send({ message: 'Rating saved successfully.' });
  } catch (error) {
    console.error('Error saving rating:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});

apiRouter.get('/ratings', async (req, res) => {
  const username = req.query.username; // Get the username from the query parameters

  if (!username) {
    console.error('Username is required to fetch ratings');
    return res.status(400).send({ message: 'Username is required.' });
  }

  try {
    const db = await connectToDB();
    console.log('Connected to database.');

    // Fetch ratings for the given username
    const ratings = await db.collection('ratings').find({ username }).toArray();
    console.log(`Found ${ratings.length} ratings for user ${username}`);

    res.status(200).send(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).send({ message: 'Internal server error.' });
  }
});


// Start the server
const PORT = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

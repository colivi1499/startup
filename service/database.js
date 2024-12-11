const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}`;

let db; // Store the database connection to reuse

// Function to connect to the database
async function connectToDB() {
  if (!db) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('share'); // Replace 'share' with your actual database name
    console.log('Connected to MongoDB');
  }
  return db;
}

// Test connection during startup
(async function testConnection() {
  try {
    await connectToDB();
    console.log('Ping successful');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// Define utility functions
function getUser(email) {
  return db.collection('user').findOne({ email: email });
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await db.collection('user').insertOne(user);

  return user;
}

// Export the functions for use in other files
module.exports = {
  connectToDB, // Export the connectToDB function
  getUser,
  createUser,
};

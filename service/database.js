const { MongoClient } = require('mongodb');
const dbConfig = require('./dbConfig.json');

const client = new MongoClient(`mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}`);

async function connectToDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('project0');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = { connectToDB };
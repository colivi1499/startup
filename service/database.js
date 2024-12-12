const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const WebSocket = require('ws');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${dbConfig.username}:${dbConfig.password}@${dbConfig.hostname}`;

let db; 
let connectedClients = 0; 


async function connectToDB() {
  if (!db) {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('share');
    console.log('Connected to MongoDB');
  }
  return db;
}


(async function testConnection() {
  try {
    await connectToDB();
    console.log('Ping successful');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

const wss = new WebSocket.Server({ port: 8080 });


function broadcastCount() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ count: connectedClients }));
    }
  });
}
wss.on('connection', (ws) => {
  connectedClients++;
  console.log(`New WebSocket connection. Total connected clients: ${connectedClients}`);
  broadcastCount();

  ws.on('close', () => {
    connectedClients--;
    console.log(`WebSocket connection closed. Total connected clients: ${connectedClients}`);
    broadcastCount();
  });
});

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

async function saveRating(email, location, menuItem, rating) {
  const newRating = {
    email,
    location,
    menuItem,
    rating,
  };

  const result = await db.collection('ratings').insertOne(newRating);
  console.log(`Rating saved with ID: ${result.insertedId}`);
  return result.insertedId;
}


module.exports = {
  connectToDB,
  getUser,
  createUser,
  saveRating,
};


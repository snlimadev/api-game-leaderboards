const { MongoClient } = require('mongodb');
const { getConnectionString } = require('../config/config');

const client = new MongoClient(getConnectionString());

async function findMultipleDocs(query, db, coll, options) {
  let result;

  async function run() {
    try {
      await client.connect();

      const database = client.db(db);
      const collection = database.collection(coll);

      const cursor = collection.find(query, options);
      result = await cursor.toArray();
    } finally {
      await client.close();
    }
  }

  try {
    await run();

    return result;
  } catch (error) {
    console.error('Error fetching from MongoDB: ', error);

    return null;
  }
}

module.exports = { findMultipleDocs };
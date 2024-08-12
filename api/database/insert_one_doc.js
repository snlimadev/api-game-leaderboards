const { MongoClient } = require('mongodb');
const { getConnectionString } = require('../config/config');

const client = new MongoClient(getConnectionString());

async function insertOneDoc(doc, db, coll) {
  async function run() {
    try {
      await client.connect();

      const database = client.db(db);
      const collection = database.collection(coll);

      const result = await collection.insertOne(doc);

      if (!result.acknowledged) {
        throw new Error('Insertion not acknowledged.');
      }
    } finally {
      await client.close();
    }
  }

  try {
    await run();

    return true;
  } catch (error) {
    console.error('Error inserting into MongoDB: ', error);

    return false;
  }
}

module.exports = { insertOneDoc };
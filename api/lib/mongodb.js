const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI
if (!uri) throw new Error('MONGODB_URI is not defined in environment variables')

let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  const client = new MongoClient(uri)
  clientPromise = client.connect()
}

function getDb() {
  return clientPromise.then(client => client.db('repair_portfolio'))
}

module.exports = { getDb }

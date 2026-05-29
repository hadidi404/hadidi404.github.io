const { getDb } = require('./lib/mongodb')
const { ObjectId } = require('mongodb')

function authCheck(req, res) {
  const token = (req.headers['authorization'] || '').replace('Bearer ', '')
  if (token !== process.env.ADMIN_SECRET) {
    res.status(401).json({ error: 'Unauthorized' })
    return false
  }
  return true
}

module.exports = async function handler(req, res) {
  try {
    const db = await getDb()
    const collection = db.collection('repairs')

    if (req.method === 'GET') {
      const repairs = await collection.find({}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json(repairs)
    }

    if (req.method === 'POST') {
      if (!authCheck(req, res)) return
      const { _authCheck, title, device, category, desc, images } = req.body
      if (_authCheck) return res.status(200).json({ ok: true })
      const result = await collection.insertOne({ title, device, category, desc, images, createdAt: new Date() })
      return res.status(201).json({ insertedId: result.insertedId })
    }

    if (req.method === 'PATCH') {
      if (!authCheck(req, res)) return
      const { _id, title, device, category, desc, images } = req.body
      if (!_id) return res.status(400).json({ error: 'Missing _id' })
      if (!ObjectId.isValid(_id)) return res.status(400).json({ error: 'Invalid _id' })
      await collection.updateOne(
        { _id: new ObjectId(String(_id)) },
        { $set: { title, device, category, desc, images, updatedAt: new Date() } }
      )
      return res.status(200).json({ ok: true })
    }

    if (req.method === 'DELETE') {
      if (!authCheck(req, res)) return
      const { _id } = req.body
      if (!_id) return res.status(400).json({ error: 'Missing _id' })
      if (!ObjectId.isValid(_id)) return res.status(400).json({ error: 'Invalid _id' })
      await collection.deleteOne({ _id: new ObjectId(String(_id)) })
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

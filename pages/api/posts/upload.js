import { connectToDatabase } from '../../../db/connectToDatabase'

const handler = async (req, res) => {
  if(req.method !== 'POST') {
    return
  }

  const { author_email, author_username, caption, image_url } = req.body
  const date = new Date()

  if(!caption || !image_url || !author_email || !author_username) {
    res.status(422).json({
      message: 'Invalid input!'
    })
  }

  const client = await connectToDatabase()
  const db = await client.db('posts')
  const postsCollection = await db.collection('posts')

  
  const result = await postsCollection.insertOne({ author_email, author_username, caption, image_url, date })

  client.close()

  res.status(200).json({
    message: 'Created Post!'
  })
}

export default handler


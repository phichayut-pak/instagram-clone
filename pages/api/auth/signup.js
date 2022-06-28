import { handleClientScriptLoad } from "next/script"
import { connectToDatabase } from "../../../db/connectToDatabase"
import { hashPassword } from "../../../lib/auth"

const handler = async (req, res) => {
  if(req.method !== 'POST') {
    return
  }

  const { email, password, fullname, username } = req.body

  if(!email || !email.includes('@') || !password || password.trim().length < 7 || !fullname || !username ) {
    res.status(422).json({ message: 'Invalid input!' })
  }

  const client = await connectToDatabase()
  const db = await client.db()
  const usersCollection = await db.collection('users')

  const existingUser = await usersCollection.findOne({ email: email })

  if(existingUser) {
    res.status(422).json({ message: 'Another account is using the same email.' })
    client.close()
    return
  }

  const existingUsername = await usersCollection.findOne({ username: username })

  if(existingUsername) {
    res.status(422).json({ message: 'Another account is using the same username.'})
    client.close()
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await usersCollection.insertOne({ email, password: hashedPassword, fullname, username })

  res.status(200).json({
    status: '200',
    message: 'Created User!'
  })

  client.close()
}


export default handler
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook'
import { connectToDatabase } from '../../../db/connectToDatabase'
import { verifyPassword } from '../../../lib/auth'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const whatToFind = credentials.email ? { email: credentials.email } : { username: credentials.username}

        const user = await usersCollection.findOne(whatToFind);

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_ID
    })
    
  ],
  pages: {
    signIn: '/auth'
  },
  adapter:  MongoDBAdapter(clientPromise),
  session: {
    strategy: 'database'
  },
  callbacks: {
    async jwt({ token, account }) {
      if(account) {
        token.accessToken = account.access_token
      }
      
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      
      const client = await connectToDatabase()
      const db = await client.db()
      const usersCollection = await db.collection('users')
  
      const users = await usersCollection.findOne({ email: session.user.email })
      session.user.username = users.username || 'None'
      session.user.fullname = users.fullname || 'None'
  
  
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})


import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook'
import { connectToDatabase } from '../../../db/connectToDatabase'
import { verifyPassword } from '../../../lib/auth'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username'},
        passwrod: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({
          email: credentials.email
        })

        if(!user) {
          client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        )

        if(!isValid) {
          client.close()
          throw new Error('Could not log you in!')
        }

        client.close()
        return { email: user.email }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  session: {
    strategy: 'jwt'
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
      
      return session
    }
  },
  pages: {
    signIn: '/auth'
  }
})
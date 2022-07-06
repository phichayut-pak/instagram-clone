import React, { useState, useEffect } from 'react'
import { signOut, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

import Navbar from '../components/Navbar/Navbar'
import PostCard from '../components/posts/ExamplePostCard'



export default function Home({ posts }) {
  const { push, asPath } = useRouter()
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Instagram</title>
      </Head>
      <Navbar>
        <div className='flex flex-col justify-center items-center py-16 space-y-3'>

          {posts.reverse().map(post => <PostCard key={post._id} image={post.image_url} author_username={post.author_username} caption={post.caption} timestamp={post.date}></PostCard>)}

        </div>
      </Navbar>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  const response = await axios.get('http://localhost:3000/api/posts/get_posts')
  const { data } = response


  if(!session) {
    return {
      redirect: {
        destination: '/auth'
      }
    }
  }

  return {
    props: {
      session,
      posts: data.posts
    }
  }

}
import React, { useState, useEffect } from 'react'
import { signOut, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

import Navbar from '../components/navbar/Navbar'
import PostCard from '../components/posts/ExamplePostCard'


export default function Home() {
  const { push, asPath } = useRouter()
  const { data: session } = useSession()

  const [posts, setPosts] = useState([])



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/posts/get_posts')
      const data = await response.data
      
      const { posts } = data
      for(const post of posts) {
        setPosts(prev => [...prev, post])
      }
    }

    fetchPosts()
  }, [])
  
  

  return (
    <>
      <Head>
        <title>Instagram</title>
      </Head>
      <Navbar>
        <div className='flex flex-col justify-center items-center py-16 space-y-3'>

          {/* {posts.length === 0 && 'Loading...'} */}
          {posts.reverse().map(post => <PostCard key={post._id} image={post.image_url} author_username={post.author_username} caption={post.caption} timestamp={post.date}></PostCard>)}

        </div>
      </Navbar>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  // const response = await fetch('http://localhost:3000/api/posts/get_posts', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // const data = await response.json()


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
      // posts: data.posts
    }
  }

}


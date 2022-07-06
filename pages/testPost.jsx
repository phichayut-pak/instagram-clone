import React from 'react'
import ExamplePostCard from '../components/posts/ExamplePostCard'
import PostCard from '../components/posts/PostCard'
const testPost = () => {
  return (
    <div>
      <ExamplePostCard></ExamplePostCard>
      <PostCard image={"https://res.cloudinary.com/dcxhciyca/image/upload/v1657116971/posts/t9ayj0ppg76xjchalixv.jpg"} caption={'test'} author_username={'ans.is_ai'} timestamp={'post.timestamp'} ></PostCard>
    </div>
  )
}

export default testPost
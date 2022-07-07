import React from 'react'
import Navbar from '../components/navbar/Navbar'
import SkeletonPostCard from '../components/posts/SkeletonPostCard'

const SkullTestPage = () => {
  return (
    <div>
      <Navbar>
        <div className='flex flex-col justify-center items-center py-16 space-y-3'>

          <SkeletonPostCard></SkeletonPostCard>
        

        </div>
      </Navbar>
    </div>
  )
}

export default SkullTestPage
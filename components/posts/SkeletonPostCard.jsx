import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


import defaultInstagramPfp from '../../public/images/default_instagram_pfp.png'
const SkeletonPostCard = ({ image, author_username, caption, timestamp }) => {


  return (
    <div className='flex flex-col justify-center items-center bg-white rounded-md border'>

      <div id="post_profile" className='py-3 px-2 w-full inline-flex justify-start items-center space-x-3'>
          <div className='w-[30px] h-[30px] bg-gray-300 rounded-full animate-pulse'></div>
          <div className="font-semibold">
            <div className="w-40 h-7 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
      </div>

      <div id="post_image" className='w-96 h-[24.7rem]'>
        <div className="w-full h-full bg-gray-300 animate-pulse rounded-b-md"></div>
      </div> 
    </div>
  )
}

export default SkeletonPostCard
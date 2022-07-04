import React from 'react'
import Image from 'next/image'
import instagramLoadingLogo from '../public/images/logos/instagram_loading_logo.png'

const Loading = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Image src={instagramLoadingLogo} alt="Instagram Logo" width={60} height={60}></Image>
    </div> 
  )
}

export default Loading
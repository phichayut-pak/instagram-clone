import React, { useState, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import instagramLogo from '.././../public/images/logos/instagram_logo.png'
import defaultInstagramPfp from '.././../public/images/default_instagram_pfp.png'

const MobileNavbar = ({ children }) => {
  const { data: session} = useSession()
  const { push } = useRouter()
  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }

  }

  const uploadToServer = async (event) => {        
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);    
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
  };




  return (
    <>
    
    <div className='border-b w-full flex justify-between items-center py-[0.30rem] px-4'>    
      <div id="new_story" className='inline-flex justify-center items-center'>
        <svg aria-label="New Story" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="13.191" fill="none" r="4.539" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></circle><path d="M18.592 21.374A3.408 3.408 0 0022 17.966V8.874a3.41 3.41 0 00-3.41-3.409h-.52a2.108 2.108 0 01-1.954-1.375 2.082 2.082 0 00-2.204-1.348h-3.824A2.082 2.082 0 007.884 4.09 2.108 2.108 0 015.93 5.465h-.52A3.41 3.41 0 002 8.875v9.091a3.408 3.408 0 003.408 3.408z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
      </div>

      <div id="instagram_logo" className='inline-flex justify-center items-center'>
        <Image src={instagramLogo} alt="instagram logo" width="104" height="37"/>
      </div>

      <div id="msg" className='inline-flex justify-center items-center'>
      <svg aria-label="Messenger"  color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.739"></path><path d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z" fillRule="evenodd"></path></svg>
      </div>

    </div>

    { children }

    <div className='fixed border-t bg-white w-full flex justify-between items-center py-[0.30rem] bottom-0 px-4'>

      <button id="home" onClick={() => push('/')}>
        <svg aria-label="Home" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
          <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z">
          </path>
        </svg>
      </button>
      
      <button id="search">
        <svg aria-label="Search &amp; Explore" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
      </button>

      <button id="new_post" className='inline-flex justify-center items-center'>
        <label>
          <input type="file" onChange={uploadToClient} accept='image/png, image/jpeg' className='hidden' name="new_post" id="new_post_img"/>
          <svg aria-label="New post" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>
        </label>
      </button>

      <button id="followers">
        <svg aria-label="Activity" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
      </button>

      <button id="profile" className=''>
        <div className='w-[24px] mt-1'>
          <Image className='rounded-full' src={defaultInstagramPfp} alt="user image" />

        </div>
      </button>
    </div>
    </>
  )
}

export default MobileNavbar
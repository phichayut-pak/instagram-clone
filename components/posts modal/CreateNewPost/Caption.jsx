import React, { useEffect, useState, } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import defaultInstagramPfp from '../../../public/images/default_instagram_pfp.png'

const Caption = ({ image, caption, onChangeCaption }) => {
  const { data: session } = useSession()
  const [givenImageURL, setGivenImageURL] = useState()

  useEffect(() => {
    setGivenImageURL(URL.createObjectURL(image))
  }, [image])

  return (
    <>
      <div className='w-full h-96 lg:h-[40rem] grid grid-cols-6 grid-flow-row'>
        <div className='col-span-4'>
          <img src={givenImageURL} alt="post image" className='w-full h-full'></img>
        </div>

        <div className='flex flex-col justify-start items-center col-span-2'>

          <div id="add_caption" className='w-full border-b'>

            <div className=''>

              <div id="profile" className='m-5 inline-flex justify-center items-center space-x-3'>
                  <Image src={defaultInstagramPfp} width={27} height={28} />
                  <div className="font-semibold">
                    {session.user.username}
                  </div>
              </div>

              <div className='flex justify-center items-center relative'>
                <textarea value={caption} onChange={(e) => onChangeCaption(e)} name="caption" id="caption" cols="30" rows="10" className='px-2 outline-none border-none resize-none bg-transparent ' placeholder='Write a caption...'></textarea>
                <div className="absolute right-3 bottom-1 cursor-pointer transition duration-75 ease-in text-sm text-[#CAD8EB] hover:text-black">
                  {caption.length + '/100'}
                </div>
              </div>

            </div>



          </div>

        </div>
      </div>
    </>
  )
}

export default Caption
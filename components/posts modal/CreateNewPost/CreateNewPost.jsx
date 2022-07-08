import React, { useState } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'

import GetImage from './GetImage'
import Caption from './Caption'

const CreateNewPost = () => {
  const { push, reload } = useRouter()
  const { data: session } = useSession()

  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')

  const onGetImage = (img) => {
    setImage(img)
  }

  const onCaptionChangeHandler = (e) => {
    if(caption.length < 100) {
      setCaption(e.target.value)
    } else {
      setCaption(prev => {
        const current = prev
        const splittedCurrent = current.split('')
        splittedCurrent.pop()
        return splittedCurrent.join('')
      })
    }
  }

  const onShareHandler = async () => {
    const selectedImage = image
    const selectedCaption = caption
    
    

    if(!selectedImage && !selectedCaption) { 
      reload()
    }

    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('upload_preset', 'instagram-clone')

    const uploadImageResponse = await fetch('https://api.cloudinary.com/v1_1/dcxhciyca/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json())
      .catch(err => {
        console.log('ERROR | post image')
        reload()
      })

    const { secure_url } = uploadImageResponse

    if(!secure_url) {
      console.log('An Error Occurred | No Secure URL')
    }

    console.log({
      author_email: session.user.email,
      author_username: session.user.username,
      caption,
      image_url: secure_url
    })

    if(secure_url) {
      const response = await axios.post('/api/posts/upload', {
          author_email: session.user.email,
          author_username: session.user.username,
          caption,
          image_url: secure_url
      })
      
      const data = response.data
      
      if(data.message === 'Created Post!') {
        reload()
      }
    }







  }

  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 w-1/2 rounded-lg ${image ? 'max-w-4xl' : 'max-w-2xl'}`}>
      <Head>
        <title>Create new post • Instagram</title>
      </Head>
      <div className='relative text-center font-semibold py-2'>
        Create new post
        {image && (

        <button onClick={onShareHandler} className='absolute right-2 bottom-2 text-sm text-[#0095F6]'>
          Share
        </button>
        )}
      </div>

      <hr />
      
      {!image && <GetImage onGetImage={onGetImage} />}
      {image && <Caption image={image} onChangeCaption={onCaptionChangeHandler} caption={caption} />}


    </div>
  )
}

export default CreateNewPost
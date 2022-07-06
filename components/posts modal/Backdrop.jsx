import React, { useEffect, useState} from 'react'
import CreateNewPost from './CreateNewPost/CreateNewPost'

const Backdrop = ({ onClose }) => {
  
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true)
    } else{
      setIsMobile(false)
    }


  }, [])

  return (
    <>
      <div className={`h-screen w-screen fixed bg-black opacity-30 z-10`} onClick={onClose}>
        <button className={`absolute right-5 top-5 ${isMobile ? 'hidden' : 'block'} `} onClick={onClose}>
          <svg aria-label="Close" color="#ffffff" fill="#ffffff" height="18" role="img" viewBox="0 0 48 48" width="18"><title>Close</title><path clipRule="evenodd" d="M41.8 9.8L27.5 24l14.2 14.2c.6.6.6 1.5 0 2.1l-1.4 1.4c-.6.6-1.5.6-2.1 0L24 27.5 9.8 41.8c-.6.6-1.5.6-2.1 0l-1.4-1.4c-.6-.6-.6-1.5 0-2.1L20.5 24 6.2 9.8c-.6-.6-.6-1.5 0-2.1l1.4-1.4c.6-.6 1.5-.6 2.1 0L24 20.5 38.3 6.2c.6-.6 1.5-.6 2.1 0l1.4 1.4c.6.6.6 1.6 0 2.2z" fillRule="evenodd"></path></svg>
        </button>
      </div>
    </>
  )
}

export default Backdrop
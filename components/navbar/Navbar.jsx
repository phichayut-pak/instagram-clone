import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'

import instagramLogo from '../../public/images/logos/instagram_logo.png'
import defaultInstagramPfp from '../../public/images/default_instagram_pfp.png'

const Navbar = ({ children }) => {
  // const [clientWindowInnerWidth, setClientWindowInnerWidth] = useState('')
  const [isMobile, setIsMobile] = useState()
  const { data: session, status } = useSession()
  const { push } = useRouter()



  // const handleChangeWidth = () => {
  //   setClientWindowInnerWidth(window.innerWidth)
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', handleChangeWidth)
  //   return () => {
  //     window.removeEventListener('resize', handleChangeWidth)
  //     console.log(window.innerWidth)
  //   }
  // })

  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsMobile(true)
    } else{
      setIsMobile(false)
    }
  }, [])

  return (
    <>
      { isMobile ? <MobileNavbar> { children }</MobileNavbar> : <DesktopNavbar> { children }</DesktopNavbar> }
    </>
  )
}

export default Navbar
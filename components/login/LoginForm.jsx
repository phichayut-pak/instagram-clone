import Image from 'next/image'
import instagramLogo from '../.././public/images/logos/instagram_logo.png'
import facebookLogo from '../.././public/images/logos/facebook_logo.png'
import AuthBtn from '../auth-ui/AuthBtn'

import RotateLoader from 'react-spinners/RotateLoader'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

const LoginForm = () => {
  const { push } = useRouter()
  const { data: session } = useSession()

  if(session) {
    push('/')
  }

  const [userEmailOrUsername, setUserEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordClick, setIsPasswordClick] = useState(false)
  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const onPasswordChange = (e) => {
    setPassword(e)
  }

  const facebookLoginHandler = async () => {
    const result = await signIn('facebook', {
      callbackUrl: '/'
    })

    console.log(result)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    let result
    
    if(userEmailOrUsername.includes('@')) {
      result = await signIn('credentials', {
        email: userEmailOrUsername,
        password,
        redirect: false
      })
    } else {
      result = await signIn('credentials', {
        username: userEmailOrUsername,
        password,
        redirect: false
      })
    }

    setIsLoading(false)
    
    if(result.status === 401) {
      switch(result.error) {
        case 'No user found!':
          setError({ isError: true, message: 'The username you entered doesn\'t belong to an account. Please check your username and try again.' })
          break
        case 'Could not log you in!':
          setError({ isError: true, message: 'Sorry, your password was incorrect. Please double-check your password.'})
      }
    }

    console.log(result)
  }  


  return (
    <div className="pt-10 px-10 pb-5 w-screen border border-[#DBDBDB] bg-white flex flex-col justify-center items-center max-w-xs">

      <div className='pb-7 '>
        <Image className="cursor-pointer" src={instagramLogo} alt="instagram_logo" width="171" height="61" />
      </div>

      <div className='w-full'>
        <form className='flex-col justify-center items-center' onSubmit={submitHandler}>
          <input onChange={(e) => setUserEmailOrUsername(e.target.value)} className="w-full block outline-none bg-[#FAFAFA] border border-[#DBDBDB] focus:border-[#A8A8A8] text-xs placeholder:text-xs py-2 px-2 my-1.5" type="text" placeholder="Username, or email" />
          
          <div className='relative'>
            <div onClick={(e) => setIsPasswordClick(!isPasswordClick) } className={`cursor-pointer absolute right-3 bottom-1.5 text-sm font-semibold ${password.trim().length >= 1 ? 'block' : 'hidden'}`}>
              { (password.trim().length >= 1 && isPasswordClick) ? 'Hidden' : 'Show'  }
            </div>
            <input onChange={(e) => onPasswordChange(e.target.value)} className="w-full block outline-none bg-[#FAFAFA] border border-[#DBDBDB] focus:border-[#A8A8A8] text-xs placeholder:text-xs py-2 px-2 my-1.5 mb-4" type={!isPasswordClick && password.trim().length !== 1 ? 'password' : 'text'} placeholder="Password" ></input>
          </div>
          
          <AuthBtn text={isLoading ? <RotateLoader size={6} margin={-17} color={'white'}/> : 'Log In'} className={`${password.trim().length >= 6 && userEmailOrUsername !== '' ? 'opacity-100' : 'opacity-30'}`}
            disabled={password.trim().length >= 6 && userEmailOrUsername !== '' ? false : true}
          ></AuthBtn>
        </form>
      </div>

      <div className='inline-flex justify-center items-center w-full space-x-3 py-4'>
        <div className="w-full h-[1px] bg-[#DBDBDB] px-3"></div>
        <div className='text-[0.75rem] font-bold text-[#8E8E8E]'>OR</div>
        <div className="w-full h-[1px] bg-[#DBDBDB] px-3"></div>
      </div>

      <button className="inline-flex justify-center items-center space-x-2" onClick={facebookLoginHandler}>
        <span id="facebook__logo" className='mt-1'><Image src={facebookLogo} alt="facebook logo" width={15} height={15}></Image></span>
        <span className='text-center text-sm text-[#385195] font-semibold'>Log in with Facebook</span>
      </button>

      {error.isError && (
        <div className='text-center font-medium text-red-500 text-sm my-3'>
          { error.message }
        </div>
      )}

      <button id="forgot_password" className='mt-3 text-xs'>
        Forgot password?
      </button>

      
    </div>
  )
}

export default LoginForm
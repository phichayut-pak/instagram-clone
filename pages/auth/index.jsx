
import { useState } from 'react'
import Login from '../../components/login/Login'
import Register from '../../components/register/Register'

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true)

  const onClickIsLoginPage = () => {
    setIsLoginPage(!isLoginPage)
  }


  return (
    <div className='min-h-screen flex justify-center items-center bg-[#FAFAFA]'>
      {isLoginPage ? <Login clickSignup={onClickIsLoginPage}/> : <Register clickLogin={onClickIsLoginPage} />}
    </div>  
  )
}

export default AuthPage
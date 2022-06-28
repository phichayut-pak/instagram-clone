import React from 'react'
import LoginForm from './LoginForm'
import ToSignUp from './ToSignUp'
const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-3'>
      <LoginForm />
      <ToSignUp></ToSignUp>
    </div>
  )
}

export default Login
import React from 'react'
import LoginForm from './LoginForm'
import ToSignUp from './ToSignUp'
const Login = ({ clickSignup }) => {
  return (
    <div className='flex flex-col justify-center items-center space-y-3'>
      <LoginForm />
      <ToSignUp onClickSignup={clickSignup} ></ToSignUp>
    </div>
  )
}

export default Login
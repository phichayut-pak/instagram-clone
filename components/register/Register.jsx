import React from 'react'
import RegisterForm from './RegisterForm'
import ToLogin from './ToLogin'

const Register = ({ clickLogin }) => {
  return (
    <div className='flex flex-col justify-center items-center space-y-3'>
      <RegisterForm></RegisterForm>
      <ToLogin onClickLogin={clickLogin}></ToLogin>
    </div>
  )
}

export default Register
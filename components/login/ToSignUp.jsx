import React from 'react'

const ToSignUp = ({ onClickSignup }) => {
  return (
    <div className='p-5 w-screen border border-[#DBDBDB] bg-white flex flex-col justify-center items-center max-w-xs'>
      <div className='text-sm'>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Don't have an account? <button className='font-semibold text-[#0095F6]' onClick={onClickSignup}>Sign up</button>
      </div>
    </div>
  )
}

export default ToSignUp
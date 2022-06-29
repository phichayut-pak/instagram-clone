
import { useState } from 'react'
import Login from '../../components/login/Login'
import Register from '../../components/register/Register'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const AuthPage = () => {
  const router = useRouter()
  const [isLoginPage, setIsLoginPage] = useState(true)
  const { data: session } = useSession()  

  console.log(session)

  const onClickIsLoginPage = () => {
    setIsLoginPage(!isLoginPage)
  }

  if(session) {
    router.push('/')
  }

  return (

    <div className='min-h-screen flex justify-center items-center bg-[#FAFAFA]'>
      <Head>
        <title>{isLoginPage ? "Login • Instagram" : "Sign up • Instagram"}</title>
      </Head>
      {isLoginPage ? <Login clickSignup={onClickIsLoginPage}/> : <Register clickLogin={onClickIsLoginPage} />}
    </div>  
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  return {
    props: {
      session
    }
  }
}

export default AuthPage
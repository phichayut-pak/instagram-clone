import { signOut, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Image from 'next/image'


import Navbar from '../components/Navbar/Navbar'

export default function Home() {

  const { push, asPath } = useRouter()
  const { data: session } = useSession()


  const loginHandler = () => {
    push(`/auth?callbackUrl=${asPath}`)
  }


  
  return (
    <>
      <Navbar>
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAFAFA]">
          <div className="text-xl lg:text-3xl">
            { session && session.user.email }
            { !session && 'Please log in'}
          </div>
          {session && <button onClick={signOut}>Log out</button>}
          {!session && (
            <button className='' onClick={loginHandler}>
              Log in
            </button>
            )}
        </div>
      </Navbar>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: '/auth'
      }
    }
  }

  return {
    props: {
      session
    }
  }

}
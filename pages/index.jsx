import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
export default function Home() {

  const { push, asPath } = useRouter()
  const { data: session } = useSession()

  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-3xl">
        { session && session.user.email }
        { !session && 'Please log in'}
      </div>
      {session && <button onClick={signOut}>Log out</button>}
      {!session && (
        <button className='' onClick={() => push(`/auth?callbackUrl=${asPath}`)}>
          Log in
        </button>
        )}
    </div>
  )
}


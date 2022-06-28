import { motion } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
export default function Home() {
  const { push, asPath } = useRouter()
  const { data: session } = useSession()

  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <motion.div className="text-2xl font-['Poppins'] "
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 100,  }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        
      >
        <button className='border-2 py-2 px-4 font-bold' onClick={() => push(`/auth?callbackUrl=${asPath}`)}> {/* when it's clicked, it'll bring to signin page */}
          { session ? `${session.user.email} || ${session.user.username}` : 'Login'}
        </button>

        <button className="border-2 py-2 px-3 font-semibold block text-center" onClick={signOut}>
          Logout
        </button>
      </motion.div>
    </div>
  )
}

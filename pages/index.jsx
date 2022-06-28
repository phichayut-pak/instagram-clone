import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
export default function Home() {
  const { push } = useRouter()
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.div className="text-2xl font-['Poppins'] "
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 100,  }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        
      >
        <button className='border-2 py-2 px-4 font-bold' onClick={() => push(`/auth/signin?callbackUrl=${asPath}`)}> {/* when it's clicked, it'll bring to signin page */}
          Click me
        </button>
      </motion.div>
    </div>
  )
}

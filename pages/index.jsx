import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.div className="text-2xl font-['Poppins'] "
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 100,  }}
        transition={{ type: 'spring', stiffness: 100, duration: 0.5 }}
        
      >
        <button className='border-2 py-2 px-4 font-bold' onClick={() => signIn({ redirect: false, callbackUrl: '/'})}> {/* when it's clicked, it'll bring to signin page */}
          Click me
        </button>
      </motion.div>
    </div>
  )
}

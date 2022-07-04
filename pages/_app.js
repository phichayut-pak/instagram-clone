import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Router from 'next/router'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))
  Router.events.on('routeChangeError', () => setLoading(false))




  return (
    <>
      { loading && <Loading />}
      
      { !loading && (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      )}
    </>
  )
}

export default MyApp

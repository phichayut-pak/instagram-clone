import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Router from 'next/router'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', () => setLoading(true))
  Router.events.on('routeChangeComplete', () => setLoading(false))
  Router.events.on('routeChangeError', () => setLoading(false))




  return (
    <>  
      <Head>
        <link data-default-icon="https://static.cdninstagram.com/rsrc.php/v3/y9/r/uhXzVt-dlj4.png" rel="icon" sizes="192x192" href="https://static.cdninstagram.com/rsrc.php/v3/y9/r/uhXzVt-dlj4.png" />
      </Head>
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

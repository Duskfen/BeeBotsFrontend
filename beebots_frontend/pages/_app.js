import '../styles/globals.scss'
import styles from '../styles/_app.module.scss'
import React, { useState } from 'react';
import LoadingScreen from '../components/loadingScreen';
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
     setLoading(true);
     setTimeout(() => setLoading(false), 3000);
  }, [])
  
  return (
     <>
         {loading?
         <LoadingScreen></LoadingScreen>:(
         <div className={styles.Content}>
            <Component {...pageProps} style={{animation: ""}} />
         </div>)}

         <Head>
            <title>Beebots</title>
            <meta name="description" content="Beebots are automated trading Algorithms" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
     </>
   

   )
}

export default MyApp

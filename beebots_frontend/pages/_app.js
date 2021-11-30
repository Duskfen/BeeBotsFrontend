import '../styles/globals.scss'
import styles from '../styles/_app.module.scss'
import React, { useState } from 'react';
import LoadingScreen from '../components/loadingScreen';
import Layout from '../components/layout';


function MyApp({ Component, pageProps }) {
   const [loading, setLoading] = useState(true);

   React.useEffect(() => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
   }, [])

   return (
      <>
         {loading ?
            <LoadingScreen></LoadingScreen> : (
               <div className={styles.Content}>
                  <Layout>
                     <Component {...pageProps} style={{ animation: "" }} />
                  </Layout>
               </div>)}
      </>


   )
}

export default MyApp

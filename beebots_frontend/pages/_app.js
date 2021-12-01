import '../styles/globals.scss'
import styles from '../styles/_app.module.scss'
import React, { useState } from 'react';
import LoadingScreen from '../components/loadingScreen';
import Spinner from '../components/spinner';
import Layout from '../components/layout';
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
   const [loading, setLoading] = useState(true);

   React.useEffect(() => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1600);
   }, [])

   return (
      <>
         {loading ?
            <LoadingScreen></LoadingScreen> : (
               <>
                  <NextNProgress color="black" height="2" ></NextNProgress>
                  <div className={styles.Content}>
                     <Layout>
                        <Component {...pageProps} style={{ animation: "" }} />
                     </Layout>
                  </div>
               </>
               )
               }
      </>


   )
}

export default MyApp

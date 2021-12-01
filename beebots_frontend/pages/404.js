import Head from 'next/head'
import Link from 'next/link'
import Box from '../components/box'
import styles from '../styles/404.module.scss'

export default function Home() {
   return (

      <>
         <Head>
            <title>Beebots Not Found</title>
            <meta name="description" content="Site not found" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <div className={styles.box}>
            <Box>
               <div>
                  <p>404 not found</p>
                  <Link href={"/"}><a>Back Home</a></Link>
               </div>
            </Box>
         </div>

      </>
   )
}

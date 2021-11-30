import Head from 'next/head'
import Navbar from '../components/navbar';
import styles from './layout.module.scss'


export default function Layout({ children }) {
   return (
      <>
         <Head>
            <title>Beebots</title>
            <meta name="description" content="Beebots are automated trading Algorithms" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
            <Navbar>
            </Navbar>
            
         <main className={styles.restrict}>{children}</main>
         
      </>
   )
}
import Head from 'next/head'
import Box from '../components/box'
import styles from './credits.module.scss'

export default function Credits() {
  return (
// https://www.ihk-wiesbaden.de/recht/rechtsberatung/internetrecht-und-werbung/internetauftritt-rechtliche-anforderungen-und-pflichten-1255572
     <>
         <Head>
         <title>Beebots Sonstiges</title>
         </Head>
         <h1>Sonstiges</h1>
         
         <h2>Impressum</h2>
         <Box>
            <div className={styles.creditWrapper}>
               <p><b>Provider:</b></p>
               <p>Lugmayr Gabriel, Pömmer Dominik, Faltin Dominik</p>
            </div>
            <div className={styles.creditWrapper}>
               <p><b>Address:</b></p>
               <p>3925 Arbesbach, Arbesbach 60</p>
            </div>
            <div className={styles.creditWrapper}>
               <p><b>Contact:</b></p>
               <p><a href="mailto:Gabriel@waldviertelblick.at">Gabriel@waldviertelblick.at</a>, <a href="tel:+4367762054831">+43 677 62054831</a></p>
            </div>
         </Box>

         <h2>Datenschutz</h2>
         <Box className={styles.creditWrapper}>
            <p><b>Todo:</b></p>
            <p>todo</p>
         </Box>

         <h2>Credits</h2>
         <Box className={styles.creditWrapper}>
            <p><b>Free vectors, icons and illustrations from Streamline:</b></p>
            <p><a href='https://streamlinehq.com'>https://streamlinehq.com</a></p>
         </Box>
      </>
  )
}

import Head from 'next/head'
import Box from '../components/box'
import styles from './credits.module.scss'

export default function Credits() {
  return (

     <>
         <Head>
         <title>Beebots Credits</title>
         </Head>
         <h1>Credits</h1>
         <Box className={styles.creditWrapper}>
            <p>Free vectors, icons and illustrations from Streamline:</p>
            <p><a href='https://streamlinehq.com'>https://streamlinehq.com</a></p>
         </Box>
      </>
  )
}

import Head from 'next/head'

export default function Home() {
  return (

     <>
         <Head>
         <title>Beebots Home</title>
         <meta name="description" content="Beebots are automated trading Algorithms" />
         <link rel="icon" href="/favicon.ico" />
         </Head>
         <p>Note: / gets redirected to /bots, you should not see this page</p>
      </>
  )
}

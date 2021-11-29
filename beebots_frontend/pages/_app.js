import '../styles/globals.scss'
import React, { useState } from 'react';
import LoadingScreen from '../components/loadingScreen';


function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
     setLoading(true);
     setTimeout(() => setLoading(false), 3000);
  }, [])
  
  return (
   loading?
   <LoadingScreen></LoadingScreen>:
   <Component {...pageProps} />
   
   )
}

export default MyApp

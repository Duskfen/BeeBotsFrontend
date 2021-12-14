import Link from "next/link";
import Beelogo from "../../components/beelogo";
import Box from "../../components/box";
import Page404 from '../404'
import styles from './index.module.scss'

export default function BotsIndex({ bots }) {
  
   if(!bots){
      return <Page404 />
   }
  
   return (
    <>
      <div>
         <div className={styles.botWrapper}>
            {bots.map((el, i) => {
               return (
                  <div key={`bot_${i}`}>                
                     <Box>
                        
                           
                           <Link href={`/bot/${el.Name}`}>
                              <a>
                                 <div className={styles.bot}>
                                    <p>{el.Name}</p>
                                    <Beelogo sad={el.profit < 0} i={i}></Beelogo>
                                    <p>{Math.round(el.profit*10000,2)/100}%</p>
                                 </div>
                              </a>
                           </Link>
                     </Box>
                  </div>
               ); 
            })}
         </div>
      </div>
      
    </>
  );
}

export async function getStaticProps() {
  //const res = await fetch("https://beebotsbackend.azurewebsites.net/api/overview?");
  //console.log(res);
  //const data = await res.json() //TODO not working
  //console.log(data);
  // const data = null;

  
  const data = {
    bots: [
      {
        BotsId: 458458214,
        Name: "Bertolomäus",
        profit: 0.23215, //percent
      },
      {
         BotsId: 4584858214,
         Name: "Josef",
         profit: -0.7, //percent
       },
       {
         BotsId: 4584858214,
         Name: "Andreas",
         profit: 0, //percent
       },
    ],
  };

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { bots: data.bots },
    revalidate: 3, // In seconds // will be passed to the page component as props
  };
}

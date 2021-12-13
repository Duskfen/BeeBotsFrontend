
import Link from 'next/link'


export default function BotsIndex({ children }) {
   return (
      <>           
         <p>Botsindex</p> 
             <Link href={"/bot/bertl"}><a>Bertl</a></Link>
             <Link href={"/bot/notexistent"}><a>notexistent</a></Link>
      </>
   )
}
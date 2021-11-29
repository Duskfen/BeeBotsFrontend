
import styles from './loadingScreen.module.scss'
import Logo from './beelogo'


export default function LoadingScreen({}) {
   return (
     <div className={styles.loadingScreen}>
         <Logo ></Logo>
     </div>
   )
 }
 

import styles from './spinner.module.scss'


export default function LoadingScreen({size = "50px"}) {
   return (
     <div className={styles.spinner} style={{width:size, height:size}}>
     </div>
   )
 }
 
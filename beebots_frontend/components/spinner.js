
import styles from './spinner.module.scss'


export default function LoadingScreen({size = "600px"}) {
   return (
      <div>
         <div className={styles.spinner} style={{width:size, height:size}}>
         </div>
      </div>
   )
 }
 
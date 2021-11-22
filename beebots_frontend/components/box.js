
import styles from './box.module.scss'

export default function Box({children, style}) {
   return (
     <div className= {styles.box} style={style}>
       {children}
     </div>
   )
 }
 

import styles from './box.module.scss'

export default function Box({children, style, className}) {
   return (
     <div className= {styles.box + " " + className } style={style}>
       {children}
     </div>
   )
 }
 
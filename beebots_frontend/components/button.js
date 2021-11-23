
import styles from './button.module.scss'

export default function Button({children, style, onClick}) {
   return (
     <button className= {styles.button} style={style} onClick={onClick}>
       {children}
     </button>
   )
 }
 
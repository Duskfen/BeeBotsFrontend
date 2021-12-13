
import styles from './spinner.module.scss'

const sizeFact = 5; 

export default function LoadingScreen({size = "120px"}) {


   return (
      <div style={{width: size, height: size, overflow:"hidden" }}>
         <div className={styles.spinner} style={{width:`calc(${size} * ${sizeFact})`, height:`calc(${size} * ${sizeFact})`,position:"relative", scale:1/sizeFact+"", 
            left: `calc(calc(calc(calc(${size} * ${sizeFact}) / 2) - calc(${size}) / 2) * -1)`,
            top: `calc(calc(calc(calc(${size} * ${sizeFact}) / 2) - calc(${size}) / 2) * -1)`}}>
         </div>
      </div>
   )
 }
 
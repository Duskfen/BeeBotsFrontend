// '_flag-error', '_flag-success', '_flag-warning', '_flag-information
import styles from './flag.module.scss';
import Box from './box'

export default function Flag({ children, style, setShowFlag, flagType }) {

   setTimeout(() => setShowFlag(false), 8000);

   return (
      <div className={[styles.flag, styles[flagType]].join(" ")} style={style}>
         <Box>
            <p>this is a {flagType} flag theres some more message going on here</p>
         </Box>
      </div>
   )
}

// '_flag-error', '_flag-success', '_flag-warning', '_flag-information
import styles from './flag.module.scss';
import Box from './box'
import Warning from '../icons/warning.svg';
import Information from '../icons/information.svg';
import Error from '../icons/error.svg';
import Success from '../icons/success.svg';
import Cancle from '../icons/cancle.svg';
import Image from 'next/image';

export default function Flag({ children, style, setShowFlag, flagType, message="No Message" }) {

   //TODO maybe handle this through a the wrapper component
   setTimeout(() => setShowFlag(false), 100000);

   let icon = Error;

   console.log(icon)
   switch (flagType) {
      case '_flag-error':
         icon = Error;
         break;
      case '_flag-success':
         icon = Success;
         break;
      case '_flag-warning':
         icon = Warning;
         break;
      case '_flag-information':
         icon = Information;
         break;
      default:
         break;
   }

   return (
      <div className={[styles.flag, styles[flagType]].join(" ")} style={style}>
         <Image src={icon} width={"20px"} alt={flagType}/>
         <Box>
            <p>{message}</p>
            {children}
         </Box>
         <Image className={"clickable"} width={"20px"} src={Cancle} onClick={() => {setShowFlag(false); setShowFlag= () => {};}} alt={"Cancle"}/>
      </div>
   )
}

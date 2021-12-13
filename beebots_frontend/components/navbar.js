
import styles from './navbar.module.scss'
import LayoutStyles from './layout.module.scss'
import Link from 'next/link'
import Beelogo from '../components/beelogo';
import Box from '../components/box'
import { useRouter } from 'next/router'

const menu = [
   { title: 'Home', path: '/' },
   { title: 'Styleguide', path: '/styleguide' },
   { title: 'Bots', path: '/bot'}
]

export default function Navbar({ children }) {
   const router = useRouter()

   return (
      <>
         <div className={styles.sticky}>
            <Box>
               <nav>
                  <div className={LayoutStyles.restrict}>

                     <div className={styles.nav}>
                        <div className={styles.Beelogo}><Beelogo height="80px" width="80px" /></div>
                        <ul>
                           {menu.map(({ title, path }) => {
                              return (
                                 <li key={`nav_${path}`}>
                                    <Link href={path}><a className={`${router.pathname === path
                                          ? styles.activeLink
                                          : null
                                       }`}>{title}</a></Link>
                                 </li>
                              )
                           })}
                        </ul>
                     </div>
                  </div>
               </nav>
            </Box>
         </div>
         {children}
      </>
   )
}

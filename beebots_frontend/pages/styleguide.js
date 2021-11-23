import styles from '../styles/Styleguide.module.scss'
import Box from '../components/box'

export default function Styleguide() {
  return (
    <div>
       <h1>Styleguide</h1>
      <Box>
         <p>Typography:</p>
         <h1>H1 Heading</h1>
         <h2>H2 Subheading</h2>
         <p>Normal Text</p>
      </Box>
      <Box>
         <p>Color Palette</p>
         <div id={styles.colorPalletteWrapper}>
            <Box>
               <div style={{backgroundColor:"var(--neutral)", width: "100%", height: "100%"}}><p>first</p></div>
            </Box>
            <Box>
               <div style={{backgroundColor:"var(--good)", width: "100%", height: "100%"}}><p>good</p></div>
            </Box>
            <Box>
               <div style={{backgroundColor:"var(--bad)", width: "100%", height: "100%"}}><p>bad</p></div>
            </Box>
         </div>
      </Box>
      
    </div>
  )
}

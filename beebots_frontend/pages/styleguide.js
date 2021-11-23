import styles from '../styles/Styleguide.module.scss'
import Box from '../components/box'
import Button from '../components/button';
import Flag from '../components/flag';
import React, { useState } from 'react';

export default function Styleguide() {

   const [showFlag, setShowFlag] = useState(false);
   // '_flag-error', '_flag-success', '_flag-warning', '_flag-information'
   let flagType = '_flag-error';

   return (
      <>
         {showFlag ? <Flag setShowFlag={setShowFlag} flagType={flagType}></Flag> : null}
         <div>
            <h1>Styleguide</h1>
            <Box>
               <p>Typography:</p>
               <h1>H1 Heading</h1>
               <h2>H2 Subheading</h2>
               <p>Normal Text</p>
               <a href="#">This is a Link</a>
            </Box>
            <Box>
               <p>Color Palette</p>
               <div className={styles.colorPalletteWrapper}>
                  <Box>
                     <div style={{ backgroundColor: "var(--neutral)", width: "100%", height: "100%", textAlign: "center" }}><p>neutral</p></div>
                  </Box>
                  <Box>
                     <div style={{ backgroundColor: "var(--good)", width: "100%", height: "100%", textAlign: "center" }}><p>good</p></div>
                  </Box>
                  <Box>
                     <div style={{ backgroundColor: "var(--bad)", width: "100%", height: "100%", textAlign: "center" }}><p>bad</p></div>
                  </Box>
                  <Box>
                     <div style={{ backgroundColor: "var(--warning)", width: "100%", height: "100%", textAlign: "center" }}><p>warning</p></div>
                  </Box>
               </div>
            </Box>
            <Box>
               <p>Components</p>
               <div className={styles.colorPalletteWrapper}>
                  <Box>
                     <p>Buttons</p>
                     <Button>Default</Button>
                  </Box>

                  <Box>
                     <p>Flag</p>
                     <Button onClick={(e) => {setShowFlag(true); flagType = "_flag-error"; console.log("shoflag")}}>Error Flag</Button>
                  </Box>

                  <Box>
                     <p>Logo</p>
                     <Button>Default</Button>
                  </Box>

                  <Box>
                     <p>Spinner</p>
                     <Button>Default</Button>
                  </Box>
               </div>
            </Box>

         </div>
      </>
   )
}

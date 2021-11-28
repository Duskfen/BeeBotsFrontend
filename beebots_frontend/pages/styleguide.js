import styles from '../styles/Styleguide.module.scss'
import Box from '../components/box'
import Button from '../components/button';
import Flag from '../components/flag';
import React, { useState } from 'react';

   // '_flag-error', '_flag-success', '_flag-warning', '_flag-information'
   let flagType = '_flag-error';
   let message = 'test';

export default function Styleguide() {

   const [showFlag, setShowFlag] = useState(false);

   return (
      <>
         {showFlag ? <Flag setShowFlag={setShowFlag} flagType={flagType} message={message}></Flag> : null}
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
                     <p>Flags</p>
                     <Button onClick={(e) => {flagType = "_flag-error"; message= "test error Message"; setShowFlag(true);}}>Error Flag</Button>
                     <Button onClick={(e) => {flagType = "_flag-success"; message= "test success Message"; setShowFlag(true);}}>Success Flag</Button>
                     <Button onClick={(e) => {flagType = "_flag-warning"; message= "test warning Message"; setShowFlag(true);}}>Warning Flag</Button>
                     <Button onClick={(e) => {flagType = "_flag-information"; message= "test information Message"; setShowFlag(true);}}>Information Flag</Button>
                  </Box>

                  <Box>
                     <p>Logo</p>
                     <p>todo</p>
                  </Box>

                  <Box>
                     <p>Spinner</p>
                      <p>todo</p>
                  </Box>
               </div>
            </Box>

         </div>
      </>
   )
}

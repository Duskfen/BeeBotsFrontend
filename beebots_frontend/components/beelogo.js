
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import beeHappy from '../icons/bee_happy.svg.json';
import beeSad from '../icons/bee_sad.svg.json';

const colors = [
    "#1abc9c",
    "#f1c40f",
    "#d35400",
    "#2980b9",
    "#8e44ad",
]

export default function Beelogo({sad = false, i = 0, height = '100%', width = '100%'}) {


    const [svg, setSvg] = useState("<svg> </svg");

    useEffect(() => {
        
        console.log(i);
        console.log(colors);

        let curcolor = colors[i%(colors.length)];

        if(sad) setSvg(beeSad?.value.replaceAll("__COLORPALLETTE__", curcolor));
        else setSvg(beeHappy?.value.replaceAll("__COLORPALLETTE__", curcolor));

        return () => {
            //cleanup
        }
    }, [])

    console.log(svg);

   return (
    <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} height= {height} width={width}></Image>
   )
 }
 
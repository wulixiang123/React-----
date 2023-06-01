import React, { useEffect, useState } from 'react'
import usePosition from '../hook/usePosition'
export default function Cat() {
    let {x,y} = usePosition();
    x -=70;
    y -=70;
    return (
        <div style={{width:50,height:50,position:'absolute', zIndex:2, left:x,top:y,background:'blue'}}>Mouse</div>
    )
}

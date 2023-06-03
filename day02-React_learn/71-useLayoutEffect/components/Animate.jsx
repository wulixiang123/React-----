import React, { useEffect, useLayoutEffect, useRef } from 'react'
import TweenMax from 'gsap' // npm i gsap@3.7.0
import './index.css'

const Animate = () => {
    const REl = useRef(null)
    useLayoutEffect(() => {
        /*下面这段代码的意思是当组件加载完成后,在0秒的时间内,将方块的横坐标位置移到600px的位置*/
        TweenMax.to(REl.current, 0, { x: 600 })
    }, [])

    // useEffect(() => {
    //     TweenMax.to(REl.current, 0, { x: 600 })
    // }, [])
    return (
        <div className="animate">
            <div ref={REl} className="square">
                square
            </div>
        </div>
    )
}

export default Animate
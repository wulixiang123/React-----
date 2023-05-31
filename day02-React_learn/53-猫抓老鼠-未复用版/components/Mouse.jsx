import React, { useEffect, useState } from 'react'

export default function Mouse() {
    let [x, setX] = useState(50);
    let [y, setY] = useState(50);
    useEffect(() => {
        const move = (e) => {
            setX(e.clientX - 70);
            setY(e.clientY - 70);
        }
        // 添加自定义事件
        window.addEventListener('mousemove', move)
        return () => {
            window.removeEventListener('mousemove', move)
        }
    }, [])
    return (
        <div style={{ width: 60, height: 60, position: 'absolute', left: x, top: y, background: '#333' }}>Mouse</div>
    )
}

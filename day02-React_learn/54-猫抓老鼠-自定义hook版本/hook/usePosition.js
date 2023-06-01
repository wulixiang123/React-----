import { useEffect, useState } from "react";

function usePosition() {
    let [x, setX] = useState(50);
    let [y, setY] = useState(50);
    useEffect(() => {
        const move = (e) => {
            setX(e.clientX);
            setY(e.clientY);
        }
        // 添加自定义事件
        window.addEventListener('mousemove', move)
        return () => {
            window.removeEventListener('mousemove', move)
        }
    }, [])
    // 返回一个对象，是x轴 y轴坐标
    return {x,y}
}
export default usePosition;
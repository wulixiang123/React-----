import React, { useImperativeHandle, useRef } from 'react'

function FunTest(props, FatherRef) {
    console.log('FatherRef: ',FatherRef);
    let sonRef = useRef();
    useImperativeHandle(FatherRef, ()=>{
        return {// 返回值就是 FatherRef的current属性值
            changeColor(){
                sonRef.current.style.color = 'red'
            },
            changeSize(){
                sonRef.current.style.fontSize = '25px'
            }
        }
    })
    return (
        <div ref={sonRef}>FunTest</div>
    )
}

export default React.forwardRef(FunTest)

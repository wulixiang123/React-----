import React from 'react'
function FunText(props,FatherRef){
    return(
        <div ref={FatherRef}>FunText</div>
    )
}
export default React.forwardRef(FunText)
// export default function FunText() {
//   return (
//     <div>FunText</div>
//   )
// }

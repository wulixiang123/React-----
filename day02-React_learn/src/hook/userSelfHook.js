import { useState } from "react";

function useSelfHook(){ // 自定义的hook函数
    let [count, setCount] = useState(100)
    return count;
}
export default useSelfHook;
import React, { useEffect, useState } from 'react'
import moment from 'moment'
export default function TimeRunner() {
    let [nowTime, setNowTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

    useEffect(()=>{// componentDidMount
        let timer = setInterval(()=>{
            console.log('111');
            setNowTime(moment().format('YYYY-MM-DD HH:mm:ss'))
        },1000)
        return ()=>{// componentWillUnmount
            clearInterval(timer)
        }
    },[])

    return (
        <div>
            <p>当前时间是： {nowTime}</p>
        </div>
    )
}

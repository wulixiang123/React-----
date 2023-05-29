import React from 'react'
import Son from './components/Son/Son'
import Header from './components/Header';

export default function App() {
    function getCount(count){
        console.log('App count: ',count);
    }
    return (
        <div>
            <h3>App</h3>
            <hr />
            {/* 通过标签属性传递数据 */}
            <Son count={'1'}  getCount={getCount}/>
            <Header/>
        </div>
    )
}

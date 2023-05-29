import React, { useState } from 'react'
import PubSub from 'pubsub-js'


export default function SearchHeader () {

  const [searchName, setSearchName] = useState('')

  const search = () => {
    // 发布搜索的消息, 通知Main组件
    PubSub.publish('search', searchName)
  }

  return (
    <section className="jumbotron">
      <h3 className="jumbotron-heading">Search Github Users</h3>
      <div>
        <input value={searchName} onChange={e => setSearchName(e.target.value)} type="text" placeholder="enter the name you search"/>
        <button onClick={search}>Search</button>
      </div>
    </section>
  )
}

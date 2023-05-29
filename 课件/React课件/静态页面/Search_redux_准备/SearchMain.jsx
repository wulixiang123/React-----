import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default function SearchMain () {

  const [firstView, setFirstView] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    // 订阅一个搜索的消息
    PubSub.subscribe('search', async (msgName, searchName) => { // 一定要用箭头函数
      // 更新为请求中的状态
      setFirstView(false)
      setLoading(true)

      try {
        // 发 ajax请求
        const response = await axios.get('https://api.github.com/search/users', {
          params: {
            q: searchName
          }
        })
        // 成功, 更新为成功的状态
        // [{login, avatar_url, html_url}]
        const users = response.data.items

        setLoading(false)
        setUsers(users)
        
      } catch (error) {  // 失败, 更新为失败的状态
        setLoading(false)
        setErrorMsg(error.message || '未知错误')
      }
    })

    return () => {
      // 取消订阅
      PubSub.unsubscribe('search')
    }
  }, [])

  // 进行条件渲染
  /* 
  输入关键字搜索
  加载中...
  请求错误的信息
  用户列表
  */
  if (firstView) {
    return <h3>输入关键字搜索</h3>
  } else if (loading) {
    return <h3>加载中...</h3>
  } else if (errorMsg) {
    return <h3>{errorMsg}</h3>
  }

  // [{name, avatar_url, url}]

  return (
    <div className="row">
      {
        users.map(user => <div className="card" key={user.login}>
          <a href={user.html_url} target="_blank">
            <img src={user.avatar_url} style={{width: 100}}/>
          </a>
          <p className="card-text">{user.login}</p>
        </div>)
      }
    </div>
  )
}

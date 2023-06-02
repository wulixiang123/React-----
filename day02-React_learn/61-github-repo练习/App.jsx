import React, { useEffect, useState } from 'react'
import request from './http'
export default function App() {
    let [loading,setLoading] = useState('false')
    let [repo,setRepo] = useState({});
    useEffect(()=>{
        async function getRepo(){
            setLoading(true)
            let{items} = await request.get('/search/repositories',{
                params:{
                    q:'vue',
                    'sort':'stars'
                }
            })
            setRepo(items[0])
            setLoading(false)
        }
        getRepo()
    },[])
  return (
    <div>
        {loading?<div>loading...</div>:(<div>most popular repo is <a href={repo.html_url}>{repo.name}</a></div>)}
    </div>
  )
}

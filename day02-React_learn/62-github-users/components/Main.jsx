import React from 'react'

export default function Main({ first, loading, users }) {
    if (first) {
        return <h3>请输入用户名搜索</h3>
    }
    return (
        <>
            {loading ? <h3>loading......</h3> : (<>
                {
                    users.map(user => (
                        <div className="card" key={user.id}>
                            <a href={user.url} target="_blank" rel="noreferrer">
                                <img src={user.avatar_url} alt="" style={{ width: 100 }} />
                            </a>
                            <p className="card-text">{user.login}</p>
                        </div>
                    ))
                }
                </>
            )}
        </>
    )
}

import React from 'react'
import { NavLink,useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
    return (
        <>
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo</h2></div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-2 col-xs-offset-2">
                    <div className="list-group">
                        <NavLink className='list-group-item' to='/about'>About</NavLink>
                        <NavLink className='list-group-item' to='/home'>Home</NavLink>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="panel">
                        <div className="panel-body">
                          {useRoutes(routes)}
                          
                            {/* <Routes>
                                <Route path='/about' element={<About/>}></Route>
                                <Route path='/home' element={<Home/>}>
                                    <Route path='/home/news' element={<News/>}></Route>
                                 
                                    <Route path='message' element={<Message/>}></Route>
                                    <Route path='/home' element={<Navigate to='/home/news'/>}></Route>
                                </Route>
                                <Route index element={<Navigate to='/home' />} />
                                <Route path='*' element={<PageNotFound/>}/>
                            </Routes> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

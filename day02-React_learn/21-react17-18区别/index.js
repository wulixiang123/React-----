// react 18版本
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//     <App />
// );

// react 17
import React from 'react'
import ReactDOM from 'react-dom' // 差别一：导入位置不同

import App from './App'

ReactDOM.render(<App/>, document.querySelector('#root'));



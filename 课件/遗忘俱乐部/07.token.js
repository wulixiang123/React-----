const jwt = require('jsonwebtoken');
const KEY = "for(let i = 0; i < 10000;i++){console.log('iloveyou')}"
// 1. 创建token
let user = {
    username: 'atguigu',
    pwd: 123123
}

let token = jwt.sign(user, KEY, { expiresIn: 3 })

console.log(token); //
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0Z3VpZ3UiLCJwd2QiOjEyMzEyMywiaWF0IjoxNjg1Njg4NTY2fQ.VyatKTuX8wWcTS_g4nwOPAd2jciGDhQrhFZlfw1Ccu4

// 2. 验证token

setTimeout(() => {
    jwt.verify(token, KEY, (err, data) => {
        if (err) {
            console.log('err: ', err);
            return;
        }
        console.log('data: ', data)
    })
}, 4000)

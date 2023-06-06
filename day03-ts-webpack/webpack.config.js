const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.ts',
    output:{
        path:resolve(__dirname,'buidl'),
        filename:'js/bundle.js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:'ts-loader'
            }
        ]
    },
    resolve:{
        extensions:['.ts','.tsx','.js']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        })
    ],
    devServer:{
        port:5000,
        open:true,
        hot:true
    }
}
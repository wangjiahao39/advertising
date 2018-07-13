const path = require('path')
//console.log(process.cwd())
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
module.exports=merge(base,{
    mode:'development',
    plugins:[new webpack.HotModuleReplacementPlugin()],
    devServer:{
        port:8000,
        hot:true,
        historyApiFallback:true,
        open:true,
        noInfo:true,
        proxy:{
            
        }
    },
    devtool:'eval-source-map'
})
const path = require('path');
//console.log(process.cwd())
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports={
    entry:{
        bundle:path.resolve(process.cwd(),'src/main.js')
    },
    output:{
        path:path.resolve(process.cwd(),'dist'),
        filename:'[name].js',
        chunkFilename:'[name][hash].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                use:['babel-loader'],
                exclude:/node_modules/
            },
            {
                test:/\.(css)$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        //publicPath: '../'
                    }
                  },'css-loader']
            },
            {
                test:/\.(jpg|png|gif|ttf|woff|svg|eot)$/,
                use:['file-loader']
            }
        ]
    },
    resolve:{
        alias:{
            "@":path.resolve(process.cwd(),"src")
        },
        extensions:['.js','.jsx']
    },
    plugins:[new webpack.DefinePlugin({
        chunkPath:JSON.stringify('plan')
    }),new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
}

var path = require('path')

var glob = require('glob');
//var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {  
    context: __dirname + '/', // 모듈 파일 폴더
    entry: { // 엔트리 파일 목록
        //app: './js/index.js',
        css:glob.sync('./css/*.css'),
        
    },
    output: {
        path: __dirname + '/dist', // 번들 파일 폴더
        publicPath: './dist/',
        filename: '[name].bundle.js' // 번들 파일 이름 규칙
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]?[hash]'
                  }
                }
            }
        ]
    }
}
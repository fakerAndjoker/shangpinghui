module.exports = {
    //代理跨域
   devServer:{
       proxy:{
           //只要请求的路径中出现了api,就会进行代理.并且将api拼接到target后面
           '/api':{
               target:'http://39.98.123.211'
           }
       }
   }
}

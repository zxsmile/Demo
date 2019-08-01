const express = require('express')
const expressStatic = require('express-static')
const bodyParser = require('body-parser')
const multer  =require('multer')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const consolidate = require('consolidate')

var server = express();
server.listen(8081)

//1.解析cookie
server.use(cookieParser('jdjahcbuiiHSHIihchchacbcuus'))

//2.使用session
var arr=[]
for(i=0;i<10000000;i++){
    arr.push('key'+Math.random());
}
server.use(cookieSession({name:'blue',keys:arr,maxAge:20*60*1000}))

//3.post数据
server.use(bodyParser.urlencoded({extended:false}))
server.use(multer({dest:'./www/upload/'}).any())

//4.配置模板引擎
 //输出什么东西
 server.set('view engine','html')
 //模板文件放在那
 server.set('views','./views')
 //那种模板引擎
 server.engine('html','consolidate.ejs')

//5.用户请求
server.get('/',function(req,res){
    res.render('1.ejs',{name:'blue'})
    
    
})

//6.static数据

server.use(expressStatic('./www'))
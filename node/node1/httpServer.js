const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const urlLab = require('url')

var str=''
var users={}
var server = http.createServer(function(req,res){
      req.on('data',function(data){
           str+=data
      })

      req.on('end',function(){
        const POST = querystring.parse(str)
        var obj = urlLab.parse(req.url,true)
        var url = obj.pathname
        const GET = obj.query 

        if(url == '/user'){
              switch(GET.act){
                //注册
                  case 'reg':
                     if(users[GET.user]){
                        res.write('{"ok":false,"msg":"此用户已存在"}')
                     }else{
                         users[GET.user]=GET.pass
                        res.write('{"ok":true,"msg":"注册成功"}')
                     }
                  break;
                //登录
                  case 'login':
                     if(users[GET.user]==null){
                        res.write('{"ok":false,"msg":"此用户不存在"}')
                     }else if(users[GET.user]!==GET.pass){
                        res.write('{"ok":false,"msg":"密码错误"}')
                     }else{
                        res.write('{"ok":true,"msg":"登陆成功"}')
                     }
                  break;

                  default:
                    res.write('{"ok":false,"msg":"未知的act"}')

              }
              res.end()
        }else{
            
            //读取文件
            var fileName = './www'+req.url
            fs.readFile(fileName,function(err,data){
               if(err){
                  res.write('404')
               }else{
                  res.write(data)
             }

                res.end()
     
            })

        }
        
        
    })
})

server.listen(8081)
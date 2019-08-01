const express = require('express')
const cookieParser = require('cookie-parser')

var server = express()

server.use(cookieParser('dhnxjskkisia'))

server.use('/aaa',function(req,res){
   //req.secret='dhnxjskkisia'
  // res.cookie('user','blue',{path:'/aaa',maxAge:30*24*3600*1000,signed:true}) 
    //console.log(req.cookies)
    res.send('ok')
    //console.log(req.signedCookies)
    res.clearCookie('user')
})

server.listen(8081)
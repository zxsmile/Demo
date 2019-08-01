const express= require('express')

var server = express()

server.listen(8081)

var routerUser = express.Router()

server.use('/user',routerUser)
routerUser.get('/1.html',function(req,res){
    res.send('1.html')
})

routerUser.get('/2.html',function(req,res){
    res.send('2.html')
})
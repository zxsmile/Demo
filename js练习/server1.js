var express = require('express');
var server = new express();
server.use('/',function(req,res){
    console.log(req.url)
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); //设置请求来源不受限制
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //请求方式
    res.header("Content-Type", "application/json;charset=utf-8");
    res.end()
})
server.listen(8081);
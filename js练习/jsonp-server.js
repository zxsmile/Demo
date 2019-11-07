var express = require('express');
var fs = require('fs'); //读取jsonp.html文件
var server = new express();
server.use('/',function(req,res){
    fs.readFile('.'+req.url,function(err,data){
        if(err){
            res.write('404');
        }else{
            res.write(data);
        }
        res.end();
    })
  
})
server.listen(8080);
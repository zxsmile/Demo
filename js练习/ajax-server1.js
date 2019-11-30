var express = require('express');
var fs = require('fs'); //读取ajax.html文件
var server = new express();
server.use('/',function(req,res){
     var name = req.query.name
    console.log(name)
    
    fs.readFile('.'+req.url,function(err,data){
        if(err){
            res.write('404');
        }else{
            res.write(data);//展示ajax这个页面
            res.send(name)
        }
        res.end();
    })

})
server.listen(8080);
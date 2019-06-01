var express = require('express');
var fs = require('fs');
var server = new express();
server.use('/',function(req,res){
    console.log(req.url)
    fs.readFile('.'+req.url,function(err,data){
        // console.log(res);
        if(err){
            res.write('404');
        }else{
            res.write(data);
        }
        res.end();
    })
})
server.listen(8080);
var express = require('express');
var fs = require('fs'); //读取ajax.html文件
var server = new express();
server.use('/',function(req,res){
    // var name = req.query.user
    // var callback = req.query.callback
    // var back = `${callback}(${JSON.stringify(name)})`
    // res.send(back)
    // res.end()
    fs.readFile('.'+req.url,function(err,data){
        if(err){
            res.write('404');
        }else{
            res.write(data);
        }
        res.end();
    })
})
server.listen(8081);
var express = require('express');
var fs = require('fs'); //读取ajax.html文件
var server = new express();
server.use('/jsonp',function(req,res){
    var name = req.query.user
    var callback = req.query.callback
    var back = `${callback}(${JSON.stringify(name)})`
    res.send(back)
    res.end()
})
server.listen(8081);
const http= require('http');
const querystring = require('querystring')
let str=''

var server = http.createServer(function(req,res){
    req.on('data',function(data){
        console.log('1')
        str+=data
    });
    req.on('end',function(){
        var POST=querystring.parse(str);
        console.log(POST)
    });
})

server.listen(8082)
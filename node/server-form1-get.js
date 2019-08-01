const http = require('http');
const urlLab = require('url')

var server= http.createServer(function(req,res){
  
       var obj = urlLab.parse(req.url,true);
       var url = obj.pathname;
       var GET = obj.query;
       console.log(url,GET)
       res.write('aaa')
       res.end()
})
 server.listen(8081)
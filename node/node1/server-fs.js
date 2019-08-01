const http = require('http')
const fs = require('fs')

var server=http.createServer(function(req,res){
   const file = './www'+req.url;
   fs.readFile(file,function(err,data){
       if(err){
           res.write('404')
       }else{
          res.write(data) 
       }
       res.end()
   })
})

server.listen(8081)
const express = require('express')
const fs = require('fs')

var server=express()

server.listen(8081)

fs.rename('./www/1.text','./www/2.text',function(err){
    console.log(err)
})
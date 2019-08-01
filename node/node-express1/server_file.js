const express = require('express')
const bodyParser=require('body-parser')
const multer = require('multer')
const pathLiab = require('path')
const fs = require('fs')

var server = express()
server.listen(8081)
var objMulter = multer({dest:'./www/upload/'})
server.use(objMulter.any())
//server.use(bodyParser.urlencoded({extended:false}))

server.post('/',function(req,res){
    var newName = req.files[0].path + pathLiab.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,newName,function(err){
        if(err){
            res.send("上传失败")
        }else{
            res.send("上传成功")
        }
    })
})
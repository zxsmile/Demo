const jade =require('jade')

var html = jade.renderFile('./view/1.jade',{pretty:true})

console.log(html)
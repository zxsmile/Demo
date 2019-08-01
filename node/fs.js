const fs = require('fs');

fs.writeFile('2.txt','555',function(err){
    if(err){
         console.log('404')
    }
   
})
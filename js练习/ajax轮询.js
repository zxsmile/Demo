function ajax(url,sucss,faild){
    var xhr = null
    if(window.XMLHttpRequest){
       xhr = new XMLHttpRequest()
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    
     xhr.open('put',url,true)
     xhr.send()
     xhr.onreadystatechange=function(){
         if(xhr.readyState==4){
             if(xhr.status==200){
                 sucss()
             }else{
                 if(faild){
                     faild()
                 }
             }
         }
     }

}

setInterval(function(){
    ajax('http://localhost:8080',function(){
        console.log('成功')
        },function(){
            console.log('失败')
    })
},1000)

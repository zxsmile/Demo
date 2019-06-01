//   ajax请求:
           //1.创建Ajax对象
          //2.连接服务器
         //3.发送请求
        //4.接受返回
function ajax(url,fuSucc,fnFaild){
    var oAjax=null;
    if(window.XMLHttpRequest){
        oAjax=new XMLHttpRequest();
    }else{
        oAjax=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    oAjax.open("get",url,true);
    oAjax.send();
    oAjax.onreadystatechange=function(){
      
          if(oAjax.readyState==4){
              
              if(oAjax.status==200){
                fuSucc(oAjax.responseText);
              }else{
                if(fnFaild){
                    fnFaild();
                }
                
              }
          }
    };
}
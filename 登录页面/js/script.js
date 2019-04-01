function onClick(){
         	var userName= document.getElementById("userName");
         	var userPassword=document.getElementById("userPassword");
         	if(userName.value.length==0){
                 alert("请输入用户名")
         	}
         	else if(userPassword.value.length<6){
         		alert('请输入最少六位密码')
         	}
             else if(isNaN(userPassword.value)==false){
             	   alert("密码不能全为数字")
             }
            
         }

         function onRemberClick(){
              var rember1=document.getElementById("remmber1");
              var rember2=document.getElementById("remmber2");
              rember1.style.display='none'?'block':'none'
              rember2.style.display='none'?'block':'none'
              console.log('rember1.style.display');
              console.log('rember2.style.display');
              
         }

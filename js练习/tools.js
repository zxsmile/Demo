       function getStyle(obj,style){
              if(document.defaultView.getComputedStyle){
                    var getstyle = document.defaultView.getComputedStyle(obj,null)[style];
                      
               }else{
                  getstyle = obj.currentStyle[style]
               }
                 return getstyle;
             }

             //操作样式样式函数
            function changeStyle (obj,style,target,speed,callback){
                          //关闭上一次开启的定时器
                          clearInterval(obj.setId);
                          //获取元素当前位置，若当前位置大于目标位置，则speed的值应该为负的，否则为正
                          var oldValue = parseInt(getStyle(obj,style));
                           if(oldValue>target){
                                speed = -speed;
                                
                            }
                            //开启定时器
                           obj.setId=setInterval(function(){

                           var oldValue = parseInt(getStyle(obj,style));
                           var newValue = oldValue + speed;
                          
                           if(speed<0 && newValue<target ||speed>0 && newValue>target){
                                newValue = target;
                            }
                         obj.style[style] = newValue + 'px';

                         if(newValue == target){
                            clearInterval(obj.setId);
                            //如果有回调函数则执行，没有则不执行。
                              callback && callback();
                            
                         }
                    },30)
             }
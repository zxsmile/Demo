var EventUtil = {
	addHander: function(element,eventType,handler){
	      if(element.addEventListener){
	            element.addEventListener(eventType,handler,false);
	      }else if(element.attachEvent){
	            element.attachEvent('on' + eventType,handler);
	      }else{
                element['on' + eventType] = handler;
	      }

	},

	removeHander: function(element,eventType,handler){
	      if(element.removeEventListener){
	            element.removeEventListener(eventType,handler,false);
	      }else if(element.detachEvent){
	            element.detachEvent('on' + eventType,handler);
	      }else{
                element['on' + eventType] = null;
	      }
	     },

	getEvent: function(event){
          return event ? event : window.event;
	},

	getTarget: function(event){
	      return event.target || event.srcElement;
	},

	preventDafault: function(event){
          if(event.preventDafault){
              event.preventDafault();
          } else{
              event.returnValue = false; 
          }
	},

	stopPropagation: function(event){
          if(event.stopPropagation){
              event.stopPropagation();
          } else{
              event.cancelBubble = true;
          }
	},

	getWheelDelta: function(event){
	      if(event.wheelDelta){
	          return (client.engine.opra && client.engine.opra < 9.5 ? -event.wheelDelta:event.wheelDelta)
	      } else{
	          return -event.detail*40;
	      }
	},

	getCharCode: function(){
	    if(typeof event.charCode == 'number'){
	          return  event.charCode;
	    } else{
	          return  event.keyCode;
	    }
	},

	//操作剪贴板
	getClipboardText: function(event){
          var clipboardData = (event.clipboardData || window.clipboardData);
          return  clipboardData.getData("text");
	},

	setClipboardText: function(event,value){
	      if(event.clipboardData){
	        return event.clipboardData.setData("text/plain",value);
	      } else if(window.clipboardData){
	        return window.clipboardData.setData("text",value);
	      }
          
	},
}
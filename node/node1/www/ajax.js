
function JsonToString(json){
    var arr = [];
     for(var name in json){
         arr.push(name + '='+ json[name]);
     }
    return arr.join('&');
}

function ajax(json){
   json = json || {};
   if(!json.url) return;
   json.data=json.data || {};
   json.type = json.type ||'get';

   if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
   }
  else {
    // 兼容IE
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  if (json.type == 'get') {
    xhr.open('get', json.url + '?' + JsonToString(json.data), true);
    xhr.send();
  } else if (json.type == 'post') {
    xhr.open('post', json.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(JsonToString(json.data));
  }
  xhr.onreadystatechange = function () {
     if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            json.success(xhr.responseText);
            
        }
        else {
        json.error && json.error();
       
       }
        
    } 
   
}

   
}
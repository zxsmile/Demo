function deepCopy(obj){
    let newObj = Array.isArray(obj)?[]:{}
    if(typeof obj !== 'object'){
        return newObj=obj
    }

    if(obj instanceof Array){
        for(let i in obj){
            newObj[i] = obj[i]
            if(typeof newObj[i] == 'object'){
                deepCopy(newObj[i])
            }
        }
    }else{
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                  if(typeof obj[key]==='object'){
                    newObj[key]=deepCopy(obj[key])
                  }else{
                    newObj[key]=obj[key]
                  }
            }
        }
    }

    return newObj
}


var obj = {
    arr1 : [1,2,3],
    fn: function(){
        console.log('我是一个方法')
    },
    a : '我是普通属性'
}

var deepClone = deepCopy(obj);
        deepClone.fn='llll'
        console.log(deepClone);
        console.log(obj)
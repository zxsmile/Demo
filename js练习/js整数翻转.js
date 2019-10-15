function fun(x){
    let newNum=0
    let str = String(x)
    if(x>=0){
        newNum = str.split('').reverse().join('')
        if(newNum==x&& x>=0){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
    
}

fun(123)
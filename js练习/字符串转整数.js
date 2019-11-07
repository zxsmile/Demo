var myAtoi = function(str) {
    let number=parseInt(str)
    let max = 2147483647
    let min = -2147483648
    if(isNaN(number)){
        number=0
    }
    if(number<min){
        number=min
    }
    if(number>max){
       number = max
    }
    console.log(number)
};

myAtoi('-91283472332')
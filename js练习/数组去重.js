

function unique(arr){
  if(!Array.isArray(arr)){
    console.log('type error!')
    return 
  }
  let newArr = []
   arr.forEach((item)=>{
      return newArr.includes(item)?'':newArr.push(item)
  })

  return newArr
}


 array = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, 'NaN',NaN, NaN, 0, 0, 'a', 'a',{},{}]
console.log(unique(array))
console.log(typeof(array))
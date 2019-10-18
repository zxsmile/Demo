function fun (l1,l2){
    let arr1 = Array.from(l1)
    let arr2 = Array.from(l2)
    let newl1 = Number(arr1.reverse().join(''))
    let newl2 = Number(arr2.reverse().join(''))
    let newl3 = newl2+newl1
    let newl4 = String(newl3).split('').reverse()
     for(let i=0;i<newl4.length;i++){
        arguments[i]=Number(newl4[i])
    }
   
    console.log(arguments)
}


fun([1,2,3],[4,5,6])
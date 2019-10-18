Function.prototype.before=function(beforefunc){
     
    return ()=>{
        beforefunc.apply(this,arguments)

        return this()
    }

}


Function.prototype.after=function(afterfunc){
     
    return ()=>{
        this()

        return afterfunc.apply(this,arguments)
    }

}



let func = ()=>console.log('func')

func = func.before(()=>{
    console.log('before')
}).after(()=>{
    console.log('after')
})
func()
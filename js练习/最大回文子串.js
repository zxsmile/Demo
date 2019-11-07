
function Student(name){
    this.name = name;
    // Null（空） null
    // Undefined（未定义） undefined
    // Number（数字） 1
    // String（字符串）'1'
    // Boolean（布尔） true
    // Symbol（符号）（第六版新增） symbol
    
    // Object（对象） {}
        // Function（函数） function(){}
        // Array（数组） []
        // Date（日期） new Date()
        // RegExp（正则表达式）/a/
        // Error （错误） new Error() 
        console.log(this.name)
        console.log(new.target)
     return null
}

obj={
    name:'milk'
}
var student = Student.bind(obj,'kkk')
var bind = new student()
console.log(bind); //{name: '若川'}


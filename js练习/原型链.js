function SuperType(name){
    this.name = name
    this.colors = ['red','green']
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name,age){
    SuperType.call(this,name)
    this.age = age
}


SubType.prototype = new SuperType()
var instance1 = new SubType('join',25)
var instance2 = new SubType('bob',36)
var instance3 = new SuperType('555')
instance1.sayName()
instance2.sayName()
instance1.colors.push('1222')
instance3.colors.push('66')
console.log(instance3.colors)
Function.prototype.mybind = function(thisArg){
    if(typeof this !== 'function'){
        throw new TypeError(this + ' must be a function');
    }
    var self = this;
    var args = [].slice.call(arguments, 1);
    var bound = function(){
        var boundArgs = [].slice.call(arguments);
        var finalArgs = args.concat(boundArgs);
        
        if(this instanceof bound){
           
            var result = self.apply(this, finalArgs);
            var isObject = typeof result === 'object' && result !== null;
            var isFunction = typeof result === 'function';
            if(isObject || isFunction){
                return result;
            }
            return this;
        }
        else{
            return self.apply(thisArg, finalArgs);
        }
    };
    if(self.prototype){
        function Empty(){}
        Empty.prototype = self.prototype;
        bound.prototype = new Empty();
    }
    return bound;
}
let obj = {
    name:'tiger'
}

function fn(name,age){
    this.say = '汪汪~';
    //console.log(new.target);
     //console.log(this.name+'养了一只'+name+','+age+'岁了 ');
}


let binds = fn.mybind(obj,'milk')
let instance = new binds()
console.log(binds.prototype)
console.log(instance.__proto__)
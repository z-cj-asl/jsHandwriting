function myinstanceof(Instance, Constructor) {
    let prototype = Constructor.prototype
    while(Instance.__proto__ !== null) {
        if(Instance.__proto__ === prototype) return true
        Instance = Instance.__proto__
    }
    return false
}

let arr = [1,2.3]

console.log('myInstanceof', myinstanceof(arr, Object))

function instanceOf(obj, constructor) {
    return constructor.prototype.isPrototypeOf(obj);
}

console.log('isPrototypeof', instanceOf(arr, Array))


module.exports = {
    myinstanceof,
    instanceOf
}
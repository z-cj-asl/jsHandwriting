function myinstanceof(Instance, Constructor) {
    let prototype = Constructor.prototype
    while(Instance.__proto__ !== null) {
        if(Instance.__proto__ === prototype) return true
        Instance = Instance.__proto__
    }
    return false
}

export default myinstanceof
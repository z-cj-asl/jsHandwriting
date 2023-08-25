class MyPromise {
    constructor(actuator) {
        this.PromiseState = 'pending'
        this.PromiseResult = null
        this.onResolveQueue = []
        this.onRejectQueue = []
        actuator(this.resolve.bind(this), this.reject.bind(this))
    }
    PromiseState = 'pending'
    PromiseResult = null
    onResolveQueue = []
    onRejectQueue = []

    resolve(res) {
        if(this.PromiseState === 'pending') {
            this.PromiseState = 'fulfilled'
            this.PromiseResult = res
            this.onResolveQueue.forEach((fn) => {
                fn(this.PromiseResult)
            })
        }
    }

    reject(res) {
        if(this.PromiseState === 'pending') {
            this.PromiseState = 'rejected'
            this.PromiseResult = res
            this.onRejectQueue.forEach((fn) => {
                fn(this.PromiseResult)
            })
        }
    }

    then(resCallback, rejCallback) {
        return new MyPromise((res, rej) => {
            const onCallback = (callback) => {
                let result = callback? callback(this.PromiseResult): this.PromiseResult;
                if(result instanceof MyPromise) {
                    result.then((val) => res(val), (val) => rej(val))
                }
                else if(this.PromiseState === 'fulfilled') {
                    res(result)
                }
                else if(this.PromiseState === 'rejected') {
                    rej(result)
                }
            }

            if(this.PromiseState === 'fulfilled') {
                queueMicrotask(() => {
                    onCallback(resCallback)
                })
            }
            else if (this.PromiseState === 'rejected') {
                queueMicrotask(() => {
                    onCallback(rejCallback)
                })
            }
            else if(this.PromiseState === 'pending') {
                this.onResolveQueue.push(() => onCallback(resCallback))
                this.onRejectQueue.push(() => onCallback(rejCallback))
            }
        })
    }

    catch(rejCallback) {
        return this.then(null, rejCallback)
    }

    finally(callback) {
        return this.then(callback, callback)
    }


    static deferred = function() {
        let result = {};
        result.promise = new MyPromise(function(resolve, reject){
        result.resolve = resolve;
        result.reject = reject;
        });
    
        return result;
    }
}

module.exports = MyPromise


const p1 = new MyPromise((resolve, reject) => {
    reject(333333) // 执行then的成功回调
})
p1.then(res => {
    console.log("res1:", res)
    return "第二次的成功回调"
}, err => {
    console.log("err1:", err)      // 输出err1: 333333
    throw new Error("err message") // 只有throw Error时才执行失败回调
}).then(res => {
    console.log("res2:", res)
}, err => {
    console.log("err2:", err)      // 输出err2: Error: err message
})

console.log('-------------------------------')

const p2 = new Promise((resolve, reject) => {
    reject(333333) // 执行then的成功回调
})
p2.then(res => {
    console.log("res1:", res)
    return "第二次的成功回调"
}, err => {
    console.log("err1:", err)      // 输出err1: 333333
    throw new Error("err message") // 只有throw Error时才执行失败回调
}).then(res => {
    console.log("res2:", res)
}, err => {
    console.log("err2:", err)      // 输出err2: Error: err message
})




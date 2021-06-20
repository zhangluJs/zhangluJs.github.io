# Promise

1. new Promise接收一个参数，该参数是一个函数，这个函数又接收两个回调函数，并且这两个回调函数可以修改promise的状态，切传入值为promise的result

2. promise 三个状态 等待 pending 完成fulfileed 失败rejected，状态在 resolve reject时修改，并且不可逆

3. then 方法接收两个函数作为参数，并且可以拿到result。调用then方法时，判断state来执行不同的回调，但是发现在执行then的时候，state还是pending的状态。这个回调函数不应该由then来触发，而是应该在resolve，rejected时触发。

4. 先将then方法的回调函数保存起来，然后在resolve，rejected时触发。但是这时候有新的问题出现，在执行保存的回调函数的时候会报错，因为此时它还是undefined。我们可以写一个定时器，将它放在最后执行，这个问题解决。但是另一个问题是，promise的异步是微任务，而我们使用定时器是宏任务。还是会有问题，所以我们需要换个微任务来做同样的事情

5. 这里可以把setTimeout换成MutationObserver，让它监听body属性的时候我们修改body的属性，以达到同样的效果。

6. 其实到这里最基本的功能已经实现了，接下来实现一些稍微复杂的功能。

```js
class MyPromise {
    constructor (handle) {
        /**
         * state 三个状态 等待 pending 完成fulfileed 失败rejected
         * 状态在 resolve reject时修改，并且不可逆
         */
        this['[[PromiseState]]'] = 'pending';
        this['[[PromiseResult]]'] = undefined;

        /**
         * 用来保存then的两个回调函数
         */
        this.resolveFn = undefined;
        this.rejectFn = undefined;

        // 传入的函数接收两个回调函数作为参数
        // 为了代码简洁，将两个回调函数抽离出来
        // 抽离出来后发现，在调用resolve()时this指向了undefined，所以需要使用bind改变this
        // handle((res) => {
        //     this['[[PromiseState]]'] = 'fulfilled';
        //     this['[[PromiseResult]]'] = res;
        // }, (err) => {
        //     this['[[PromiseState]]'] = 'rejected';
        //     this['[[PromiseResult]]'] = err;
        // })
        handle(this.resolved.bind(this), this.rejected.bind(this));
    }
    resolved() {
        this['[[PromiseState]]'] = 'fulfilled';
        this['[[PromiseResult]]'] = res;
        // 这里换成使用MutationObserver，因为setTimeout是宏任务。而promise.then是微任务
        // setTimeout(() => {
        //     this.resolveFn(res);
        // })

        let run = () => {
            this.resolveFn(res);
        };

        let ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        });
        document.body.setAttribute('my-promise': 'true');

    }
    rejected() {
        this['[[PromiseState]]'] = 'rejected';
        this['[[PromiseResult]]'] = err;
        // 这里换成使用MutationObserver，因为setTimeout是宏任务。而promise.then是微任务
        // setTimeout(() => {
        //     this.rejectFn(err);
        // })

        let run = () => {
            this.rejectFn(res);
        };

        let ob = new MutationObserver(run);
        ob.observe(document.body, {
            attributes: true
        });
        document.body.setAttribute('my-promise': 'true');
    }
    then(onResolved, onRejected) {
        // 最开始的思路是，调用then方法时判断状态，执行不同的回调函数，但是发现在执行then的时候，state还是pending的状态
        // 所以这个回调函数不应该由then来触发，而是应该在resolve，rejected时触发
        // if (this['[[PromiseState]]'] = 'fulfilled') {
        //     onResolved(this['[[PromiseResult]]']);
        // }

        this.resolveFn = onResolved;
        this.rejectFn = onRejected;
    }
}
```



### `promise.all` 所有promise对象都then完毕后才then，当有一个promise实例为reject时，则整个为reject。返回值是一个包含了所有结果的数组，并且与传入的promise实例的顺序一致

```js
// Promise.all的简单实现
EasyPromise.all = function (promises) {
    let count = 0;
    let result = [];
    let len = promises.length;
    return new Promise((resolve, reject) => {
        for (let i = 0; i < len; i++) {
            promises[i].then(res => {
                count += 1;
                result.push(res);
                if (count === len) {
                    resolve(result);
                }
            }, reject);
        }
    })
}
```

### `promise.race` 当前队列中谁先完成即完成，返回值为完成的promise的结果

```js
// Promise.race的简单实现
EasyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(res => {
                resolve(res);
            }, reject);
        }
    })
}
```

关于promise的一些基本介绍，在文章[JavaScript异步操作](https://zhanglujs.github.io/blog/dist/index.html#/js-async)中有提到。

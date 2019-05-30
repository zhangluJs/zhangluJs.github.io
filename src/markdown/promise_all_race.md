- `promise.all` 所有promise对象都then完毕后才then，当有一个promise实例为reject时，则整个为reject。返回值是一个包含了所有结果的数组，并且与传入的promise实例的顺序一致

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

- `promise.race` 当前队列中谁先完成即完成，返回值为完成的promise的结果

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

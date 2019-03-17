# JavaScript中的异步操作

单线程的js在执行中简洁明了，但同时也带来了一个非常头疼的问题，当某个操作占用了大量的资源的时候，后面的操作不得不得等到前面的任务结束才可以开始执行。于是异步的解决方法孕育而生。

### 回调函数

回调函数的用法是将一个函数当作参数传入，在另一个函数内部调用。这样当外部函数执行完毕后将会接着向下执行，回调函数并不会影响后续的操作。回调函数有一个相当大的弊端。当回调函数嵌套层数不多时还好，一旦嵌套多起来整个代码块将会非常复杂。
回调函数在Javascript中非常常见，一般是需要在一个耗时操作之后执行某个操作时可以使用回调函数。回调函数是我在刚开始学习js时遇到解决异步问题的第一个方法。

```js
function f1(callback) {
    setTimeout(function () {
        callback();
    }, 500)
}

function f2() {
    console.log('我是个回调函数');
}

f1(f2);
```

### 事件监听

函数fn只有在被事件触发时才会被执行，所以不会对其他部分有影响。

```js
var ele = document.getElementById('ele');
ele.addEventListener('click', fn);
ele.attchEvent('onclick', fn);
ele.onclick = fn;
```

### promise

promise是ES6中专门用来解决异步编程的一种解决方案。比如嵌套了N层的回调函数，嵌套多了头晕。

promise接收一个函数作为参数，该函数接收两个值，resolve/reject。可以简单理解为成功时需要调用的方法，失败时需要调用的方法。在promise外部进行链式调用可以捕获到响应。关于promise还有一些api，可以慢慢看一看。

在promise中有三个状态：pending，fulfilled，rejected。

状态执行有两种过程：pending -> fulfilled、pending -> rejected。调用promise的then方法，可以捕捉状态为fulfilled的操作，第二个参数可以捕捉状态为rejected的操作，或者使用catch（建议使用这个）。值得注意的是，当promise返回false或者报错时，也会被catch捕捉到。

```js
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('我执行完了，继续吧');
        }, 500)
    });
}

fn().then(msg => {
    console.log(msg);
}).catch(err => {
    console.log(err);
});
```

### Async/await

async/awiat是es7中新增的api，通过async关键字定义一个函数，该函数总是返回一个promise，如果代码中有```return <非promise>```语句，javascript会自动把返回的值包装成promise的resolve。

```js
async function f() {
    return 1
}
f().then(alert) // 1
// 我们也可以显式的返回一个promise，这个将会是同样的结果：
async function f() {
    return Promise.resolve(1)
}
f().then(alert) // 1
```

关键词await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。

以下是一个promise在1s之后resolve的例子：

```js
async function f() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(function() {resolve('done!')}, 1000);
    });
    let result = await promise; // 直到promise返回一个resolve的结果。
    alert(result); // done!
}

f();
```

也是刚刚接触到这个东西，没在项目中实际的运用，还需要慢慢消化。查阅资料的时候发现了一篇写的不错的文章[Async/await学习](https://segmentfault.com/a/1190000013292562?utm_source=channel-newest)。




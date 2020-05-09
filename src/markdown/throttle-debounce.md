# 函数节流 & 函数防抖

**函数节流：函数在某段时间内只触发一次，比如resize，mousemove事件等。如果不做处理短时间内触发多次，而函数内部的功能没有执行完毕（比如操作DOM）这样是十分耗费性能的，甚至造成浏览器卡死、崩溃。**

除此之外，重复的 ajax 调用不仅可能会造成请求数据的混乱，还会造成网络拥塞，占用服务器带宽，增加服务器压力，显然这个问题也是需要解决的。

```js
// 定时器版
function throttle(fn, wait) {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(content, args);
                timer = null;
            }, wait);
        }
    }
}

function handle() {
    console.log(Math.random());
}

window.addEventListener('mousemove', throttle(handle, 500));
```


```js
// 时间戳版
function throttle(fn, wait) {
    let previous = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            fn.apply(content, args);
            previous = now;
        }
    }
}
```

未完待续...
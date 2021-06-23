# 函数节流 & 函数防抖

**函数节流throttle：减少高频触发事件的频率**

**函数节流debounce：多次触发的事件只执行最后一次**

节流与防抖主要是为了提高用户体验与页面性能。

```js
// 节流 throttle
function throttle(fn, delay) {
    let timer = null;
    return function () {
        if (timer) {
            return false;
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

function handle(e) {
    console.log(e.offsetY);
}

window.addEventListener('mousemove', throttle(handle, 100));
```

```js
// 防抖 debounce
function debounce(fn, delay) {
    let timer = null;
    return function() {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}
```
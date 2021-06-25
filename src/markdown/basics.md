#### JS

**变量类型和计算**

基本类型
```js
let a // undefined

let s = 'abc' //string

let n = 100 // number

let b = true // 布尔

let s = Symbol('s') // symbol
```
引用类型
```js
const obj = {x: 100}

const arr = ['a', 'b', 'c']

const n = null // 特殊的引用类型，指针指向为空地址

function fn() {} // function 特殊引用类型，但不用于存储数据，所以没有拷贝、复制函数这一说
```

* var let const的区别

    var: 没有块级作用域，存在变量提升

    let: 有块级作用域

    const: 有块级作用域，常量声明后不可修改

* typeof 可以查看哪些类型

    基本类型: number、string、boolean、undefined、symbol

    引用类型: object

    其他: function

* 类型转换

    强制类型转换: parseInt、parseFloat、toString

    隐式类型转换: if、 == 、 +字符串拼接、 逻辑运算符

为什么引用类型赋值会拷贝引用地址？是因为考虑到性能或存储问题。值类型的占用空间比较少，而引用类型有可能是一个非常大的对象，而且如果直接复制的话会导致过程特别的慢。

![引用类型存储](./static/img/引用类型的存储.png)

**typeof 运算符**

识别所有基本类型、识别函数、判断是否是引用类型（不可再细分 object）

typeof null // object。在javasciprt所有数据类型转换为二进制的表示时，前三位是0表示了object，而null转换为二进制时，全部都是0，前三位自然也是0，所以就输出了object。其实这是一个历史bug，后来提议修复，但是被驳回了。

**类型转换**

字符串拼接、if语句和逻辑运算（除了 == null 之外。其他一律用 ===）

**原型**

* class 

```js
/** 父类 */
class People {
    constructor(name) {
        this.name = name;
    }
    eat() {
        console.log(`${this.name} eat something`);
    }
}

/**
 * 继承
 * extends
 * super 通过super来执行父类的构造函数
 * 扩展或重写方法
 */
class Student extends People {
    constructor(name, number) {
        super(name); // 这里调用了父类的constructor
        this.number = number;
    }
    sayHi() {
        console.log(`姓名${this.name} 学号${this.number}`);
    }
}

const xialuo = new Student('夏洛', 20);

// 类型判断 instanceof 
xialuo instanceof Student // true
xialuo instanceof Prople // true
xialuo instanceof Object // true

// class 实际上是函数
typeof People // 'function'
typeof Student // 'function'

// 隐式原型和显式原型
console.log(xialuo.__proto__)
console.log(Student.prototype)
console.log(Student.prototype === xialuo.__proto__)
```
    每个class都有显式原型 `prototype`

    每个实例都有隐式原型 `__proto__`

    实例的__proto__指向对应class的prototype

**原型链**

new 出来的实例`xialuo`可以访问`sayHi`方法，但是它本身是没有的，所以在访问的时候就在隐式原型`__proto__`属性上去找。而它的`__proto__`指向了`Student`的`prototype`(`xialuo.__proto__ === Student.prototype`)。在`Student.prototype`上有sayHi方法，调用。

实例`xialuo`访问`eat`方法，依然是按照刚才的步骤往上查找。首先自身没有，则沿着`__proto__`向上寻找，这时的`__proto__`是`Student.prototype`。但是`Student.prototype`也没有，则继续沿着隐式原型`__proto__`向上查找。`Student.prototype.__proto__`指向`People`的`Prototype`，这时候找到了方法`eat`，调用。

如果我们访问一个没有被定义过的方法，则依然会沿着`__proto__`向上查找，直到访问`Object.prototype.__proto__`为`null`，会返回一个`undefined`。结合下面的代码和图片。

```js
class People {
    constructor(name) {
        this.name = name
    }
    eat() {
        // ...
    }
}

class Student extends People {
    constructor(name, number) {
        super(name);
        this.number = number
    }
    sayHi() {
        // ...
    }
}

const xialuo = new Student('夏洛', 100);
console.log(xialuo.name) // 夏洛
console.log(xialuo.number) // 100
console.log(xialuo.__proto__ === Student.prototype) // true
```
![原型链](./static/img/prototype.jpg)

**闭包**

**自由变量的查找，是在函数定义的地方，向上级作用域查找，而不是在执行的地方！！！**

```js
function create() {
    let a = 100;
    return function () {
        console.log(a);
    }
}
const fn = create();
const a = 200;
fn(); // 100


function print(fn) {
    let b = 200;
    fn1();
}

let b = 100;
function fn1() {
    console.log(a)
}

print(fn);
```

实际开发中闭包的作用： 常用于隐藏数据。下面是一个cache示例

影响：变量会常驻内存，得不到释放。闭包不要乱用。

```js
// 将变量保存在一个独立的区域内，不会被污染，通过特定的api访问
function createCache() {
    const data = {};
    return {
        set(key, val) {
            data[key] = val;
        },
        get(key) {
            return data[key];
        }
    }
}
let c = createCache();
c.set('a', 100);
console.log(c.get('a'));
```

**this**

**this取什么值，是在函数执行的时候确定的，不是定义的时候！！！**
  
 1. 作为普通函数
 2. 使用call apply bind
 3. 作为对象方法被调用
 4. 在class方法中被调用
 5. 箭头函数

实现一个call、apply、bind。它们仨都是用来改变this的指向的。其实实现起来并不算难。
 1. 既然要将this指向指到传入的第一个参数里，那就将函数作为该对象的属性。
 2. 将传入的其他参数传入函数进行调用，也就是这里的this，此时已经是obj.fn了。
 3. 删除这个属性，否则会越来越多。
 4. 返回执行结果

```js
// 实现一个call
Function.prototype.myCall = function (obj) {
    // 判断是否为一个对象
    obj ？ Object(obj) : window;
    let arr = [];
    // 拿到除了第一项的所有参数。注意i 从 1开始。因为第0项是对象。
    // 也可以使用es6的结构 arr = [...argument].slice(1);
    for (let i = 1; i < arguments.length; i++) {
        arr.push(arguments[i]);
    }
    obj.fn = this;
    let result = obj.fn(...arr);
    delete obj.fn;
    return result;
}

// 实现一个apply
Function.prototype.myApply = function (obj, arr) {
    obj ? Object(obj) : window;
    obj.fn = this;
    let result;
    if (arr) {
        result = obj.fn();
    } else {
        result = obj.fn(...arr);
    }
    delete obj.fn;
    return result;
}

// 手写一个bind
Function.prototype.myBind = function () {
    // 获取所有的参数
    let args = Array.prototype.slice.call(arguments);

    // 拿出需要指向的this指向
    let t = args.shift();

    // 保持调用的this指向
    let self = this;

    // 返回一个函数
    return function () {
        // 将调用的函数this指向新传入的对象
        return self.apply(t, args);
    }
}
```

**JS如何执行(event loop)**

JS是单线程的

异步要基于回调来实现

从前到后，一行一行执行

如果某一行执行报错，则停止下面代码的执行

先把同步代码执行完，再执行异步

 event loop 过程1

 1. 同步代码，一行一行放在call stack执行
 2. 遇到异步，会先“记录”下，等待时机（定时、网络请求等）
 3. 时机到了，就移动到callback Queue
 
 event loop2 

 1. 如果call stack为空（即同步任务执行完），则开始event loop机制。开始执行callback queue中的任务
 2. 轮询查找 callback queue，如有则移动到 call stack 执行
 3. 然后继续轮询查找，重复2

 **宏任务macroTask和微任务micorTask**

异步回调队列里的任务分为微任务与宏任务

```
> 执行顺序是：
    >> 1、同步代码按顺序执行一行一行执行，遇到异步任务推入异步队列，异步队列又分为微任务与宏任务。遇到像promise、async/awai推入微任务队列，像定时器这种推入宏任务队列。
    >> 2、在主线程代码执行完成后，开始将微任务队列中的任务推入调用栈，一个一个执行，微任务队列为空后，开始尝试渲染DOM（如果DOM结构发生了改变）。
    >> 3、微任务执行完之后开始执行宏任务队列中的任务，一个一个执行，将宏任务推入调用栈，执行中如果遇到微任务则执行微任务，微任务执行完成后尝试渲染DOM。完成后再执行下一个宏任务。如此循环
```
1. 宏任务：setTimeout、setInterval、Ajax、DOM事件
2. 微任务：Promise、async/await、process.nextTick、setImmediate

**为什么微任务执行时机比宏任务要早？**

2021/06/19 更新。微任务的精度要高一些，实时性也需要高一些，因此微任务看上去需要先执行。比如MutatioObserver为什么是个微任务？因为它需要第一时间获取dom最新的信息。

- 宏任务：DOM渲染后触发，如setTimeout

- 微任务：DOM渲染前触发，如Promise

**为什么微任务在前宏任务在后？**

2021/06/19 更新。这两天看了新的资料，资料里说宏任务其实是要先于微任务执行的，其实script标签就相当于一个大的宏任务，微任务总是排在当前宏任务的队尾。当前宏任务中的同步代码执行完成后，执行当前宏任务中的微任务。执行完成后执行下一个宏任务，依次执行。看下面的这个示意。

【这是大的宏任务1  [...这里是微任务]】 --event loop-- 【这是大的宏任务2   [...这里是微任务]】--event loop-- 【这是大的宏任务3  [...这里是微任务]】

- 微任务：ES中的规范，不依赖于浏览器等载体，js引擎统一处理

- 宏任务：ES语法没有，JS引擎不处理，需要靠浏览器来干预。

综上所述，代码执行顺序如下：
1. 执行call stack
2. 执行微任务队列
3. 尝试DOM渲染
4. 触发event loop 执行宏任务队列
5. 每执行完一个宏任务，都会从2开始再次循环，如此往复

**promise**

 三种状态 pending(在过程中) resolved|fulfilled(解决) rejected(失败)

 pending -> resolved|fulfilled 或 pending -> rejected。 变化不可逆
 
 **new Promise传入的函数在js的主线程上，所以是同步的进行的。而.then.catch则进入了异步回调队列**

- 状态的表现和变化
 1. pending 状态，不会触发then和catch
 2. resolved 状态，会触发then回调函数
 3. rejected 状态，会触发catch回调函数

- then和catch对状态的改变

 1. then 正常返回resolved，里面有报错则返回reject
 2. catch 正常返回resolved，里面有报错返回reject

 大白话就是，then、catch都会返回resolved状态，除非里面的代码出了问题。才会被下一下catch捕获。rejected肯定会被catch捕获，但是这个catch不报错的话又会是resolved状态。

- async / await和promise的关系

 同步语法，彻底消灭回调函数

 1. 执行async函数返回的时候一个状态为fulfilled的Promise对象
 2. await相当于Promise的then
 3. try catch相当于Promise的catch

 关于面试题里的一个东西

下面这段代码，起初我认为的执行顺序是script start、script end、async1 start、async2、async1 end。结果跑出来大错特错，这也是我最怕的题。看了正确答案后慢慢顺着捋一下。

第一步 输出script start没问题。

第二步 其实是async1 start。**我开始以为被async声明过的函数进了异步队列里去了，其实不是的，它依然是一个正常的函数**。

第三步 接着往下走await async2()。这里没问题输出async2了。**但是重点来了，在await下面的代码全部都进入了异步回调队列中。因为await后的代码需要等待执行**。也就是说

第四步 它跑去执行了主进程上的script end，这时候call stack里已经没有任务了

第五步 异步回调机制开始，event loop把async1 end拿出来执行。

 ```js
async function async1() {
    // 执行
    console.log('async1 start'); // 2
    // 开始执行async2 
    // 重点await下面的代码相当于全部进入了异步队列里
    await async2(); // await 下面的代码相当于全部进入了异步回调。所以这时候回到了主任务里的，所以这里的下面是最后一步执行的
    console.log('async1 end'); // 5
}

async function async2() {
    console.log('async2'); // 3
}

console.log('script start') // 1
async1(); // 遇到函数立刻执行，现在还没进入到异步里去
console.log('script end') // 4
 ```

**for ... of**

1. for...in (以及forEach for)是常规的同步遍历

2. for...of 常用于异步的遍历


* 手写深度比较，模拟loadsh isEqual

```js
/**
 * 1.判断是否为对象，如果不为对象则说明是普通的基本类型，直接比较。否则继续往下执行
 * 2.判断传入的两个值是否为同一个值，如果是返回true，否则继续往下走
 * 3.判断两个对象的keys是否一样，不一样则直接返回false，否则继续执行
 * 4.以obj1为基准，和obj2依次递归比较
 */
let obj1 = {a: 100, c: '12', b: {x: 100, y: 200}};
let obj2 = {a: 100, c: '12', b: {x: 100, y: 200}};

function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }
    if (obj1 === obj2) {
        return true;
    }
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);
    if (obj1keys.length !== obj2Keys.length) {
        return false;
    }
    for (let key in obj1) {
        let res = isEqual(obj1[key], obj2[key]);
        if (!res) {
            return false;
        }
    }
    return true;
}
```

* slice 和 splice的区别

    slice（切片）不会改变原数组

    splice（剪接）会改变原数组



#### CSS

- 关于盒模型宽度的计算

下面这段CSS在标准盒模型下的宽度为 width100 + border2 + padding20 = 122。offsetWidth = 122。clientWidth = 120

```css
#div1 {
    width: 100px;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    /* box-sizing: border-box; */
}
```

- 纵向重叠

第一个p标签与最后一个p标签之间的距离有15像素。在css中如果同时设置了margin的top与bottom取最大的值。而中间几个空的p标签忽略。

```html
<style>
    p {
        font-size: 16px;
        line-height: 1;
        margin-top: 10px;
        margin-bottom: 15px;
    }
</style>
<p>AAAA</p>
<P></P>
<P></P>
<P></P>
<P>bbbb</P>
```

- margin负值

给容器设置负的外边距后，top、left会影响自身，而right、bottom会影响紧随的后面的容器。right负值的时候可以理解为自身的宽度变小了，所以后面的元素才会跟上来。

```html
<style>
    .div1,
    .div2 {
        width: 100px;
        height: 100px;
        background: pink;
    }
    .div1 {
        margin-top: -10px;
        margin-left: -10px;
        margin-right: -10px;
        margin-bottom: -10px;
    }
</style>
<div class="div1"></div>
<div class="div2"></div>
```

- BFC

其实这玩意从学前端开始就在用了，只不过不知道这么高大上的名字。在当初画页面的时候就知道用overflow：hidden或者float: 来解决一个容器无法被元素撑开的问题。
Block Format Context(块级格式化上下文)。一个独立的渲染区域，内部的元素渲染不会影响边界以外的元素（其实大白话就是页面中的一个块，这个块里的样式还挺丰富，但是丰富归丰富，不会影响其他容器）。

形成BFC的条件。

1. float不是none的容器

2. position是absolute、fixed

3. overflow不是visible

4. display是flex、inline-block等

BFC清除浮动


- 圣杯布局

```html
<style>
    .container {
        overflow: hidden;
        /* 这里padding主要是约束中间的center给左右留下空间 */
        padding-left: 200px;
        padding-right: 150px;
    }
    .center {
        width: 100%;
        float: left;
        background: yellow;
    }
    .left {
        position: relative;
        width: 200px;
        float: left;
        /* 
           这里的 -100%很关键，这个100%的宽度是相对于父容器的宽度，
           他相当于将自身移动到了父容器的最开始的位置，但是父容器
           有padding所以还要定位把它放到最开始的位置
        */
        margin-left: -100%;
        right: 200px;
        background: pink;
    }
    .right {
        width: 150px;
        float: left;
        /*  
            这里的margin-right: -150px;最开始没理解，
            后来看说margin-right负值可以理解为减少了自己的宽度，
            所以。这里的宽度减少后自然而然就会上去
        */
        margin-right: -150px;
        background: powderblue;
    }
</style>
<div class="container">
    <div class="center">center</div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

- 双飞翼布局

双飞翼布局相比较圣杯布局理解起来要简单一些
一定要用负margin实现才能叫双飞翼布局和圣杯布局吗？ float也可以实现，不懂～

```html
<style>
    .left {
        width: 200px;
        float: left;
        margin-left: -100%;
        background: lightskyblue;
    }
    .right {
        width: 150px;
        float: left;
        margin-left: -150px;
        background: saddlebrown;
    }
    .center {
        width: 100%;
        float: left;
        background: yellow;
    }
    .main {
        margin-left: 200px;
        margin-right: 150px;
    }
</style>
<div class="container">
    <div class="center">
        <div class="main">
            main
        </div>
    </div>
    <div class="left">left</div>
    <div class="right">right</div>
</div>
```

- flex

display: flex; 将容器定义为盒模型

flex-direction 决定元素以什么方式排列默认值是row水平排序。 row-reverse反方向。column垂直排序。column-reverse反方向垂直排序。

flex-wrap 决定元素是否换行 默认值no-wrap。wrap 换行。wrap-reverse反方向的换行

justify-content 决定元素之间是否留白 默认值flex-start。flex-end子元素位于结尾。space-between 子元素之间留白。space-around 各行之前、之后、之间都留白

align-items 决定子元素的垂直对齐方式 默认值stretch。center垂直剧中。 flex-start 垂直顶部。flex-end 垂直底部

align-self 子元素的属性。单独设置子元素的垂直对齐方式。默认值stretch。center垂直剧中。flex-start 顶部。flex-end 底部

- rem

rem 是一个长度单位
    
    px，绝对长度单位，最常用

    em，相对长度单位，相对于父元素，不常用

    rem，相对长度单位，相对于根（root）元素，常用语响应式布局。html的font-size默认是16px。想要1rem = 1px  10 / 16 * 10

响应式布局常用的解决方案

    media-query。根据不同的屏幕宽度设置跟元素的font-size

    rem，基于根元素的相对单位进行计算

- vw/vh

    vh 网页视口高度的 1/100
    
    vw 网页视口宽度的 1/100
    
    vamx 取两者最大值 vmin 取两者最小值

#### DOM

**获取节点**

- document.getElementById('div1');

- document.getElementsByTagName('div');

- document.getElementsByClassName('div-1');

- document.querySelectorAll('p');

**property**

- document.getElementById('div1').style.width = '100px';

- document.getElementById('div1').style.width;

- document.getElementById('div1').className;

**Attribute**

直接作用于标签上，可以设置自定义属性

- document.getElementById('div1').setAttribute('data-name', 'my-node');

- document.getElementById('div1').getAttribute('data-name');

**DOM结构操作**

```js
const div1 = document.getElementById('div1');
// 新建节点
const p1 = document.createElement('p');
// 设置节点内容
p1.innerHTML = 'this is p1';
// 插入、追加节点（对已有节点进行插入操作，会移动已有节点）
div1.appendChild(p1);
// 获取父元素
console.log(div1.parentNode);
// 获取子元素(包涵文本元素 nodeType === 3)
console.log(div1.childNodes);
// 删除节点
div1.removeChild(p1);
```

**优化DOM操作性能**

DOM操作会导致浏览器的重绘(repaint)、重排(reflow)，尽量减少DOM的操作

对DOM查询做缓存

将频繁操作改为一次性操作。

```js
const div1 = document.getElementById('div1');

// 创建一个文档片段
let frag = document.createDocumentFragment();

for (let i = 1; i <= 5; i++) {
    let p = document.createElement('p');
    p.innerHTML = `this is p${i}`;
    // 将新建的节点统一插入这个文档片段中
    frag.appendChild(p);
}

// 将这个文档片段插入节点中
div1.appendChild(frag);
```

#### BOM

- navigator 客户端信息 `window.navigator.userAgent`

- screen 屏幕信息 `window.screen.width`

- location 地址url信息 `window.location.host`

- history 页面前进、后退的信息

**事件**

```js
// 通用的事件代理函数
function bindEvent(ele, type, selector, fn) {
    if (fn == null) {
        fn = selector;
        selector = null
    }
    ele.addEventListener(type, e => {
        let target = e.target;
        if (selector) {
            if (target.metches(selector)) {
                fn.call(target, e); // fn(target, e)
            }
        } else {
            fn.call(e);
        }
    })
}

const div1 = document.getElementById('div1');
bindEvent(div1, 'click', function(e) {
    console.log(this.innerHTML);
})

const uls = document.getElementById('ul1');
bindEvent(uls, 'click', 'li', function(e) {
    console.log(this.innerHTML); // e.innerHTML
})
```

#### ajax

网络请求

**readyState的几个状态码**

- 0: send还没发送
- 1: send已经发送等待响应
- 2: 响应完成，接收到了响应参数
- 3: 解析参数
- 4: 参数解析完成，可以供客户端使用

```js
function ajax(methods, url, data) {
    return new Promise((resolve,reject) => {
        // 这里就不考虑ie兼容的问题了 new ActiveXObject('Mi....')
        let xhr = new XMLHttpRequest();
        // 原生ajax支持异步
        // true 异步 false同步
        xhr.open(mtehods, url, true);
        xhr.onreadyStateChange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(new Error('....错误'));
                }
            }
        }
        xhr.send(data = '');
    })
}

ajax('GET', 'xxxxx.json').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
```
**跨域**

浏览器出于安全的角度考虑，不可以进行跨域访问资源。如果客户端与server端，协议、域名、端口任意一项不同，则视为跨域。但是这只是浏览器的行为，在其他端则没有这样的限制。

常见的跨域有两种方式

1. jsonp。利用src可以跨域的特性来完成。服务端将函数作为返回，并将数据作为函数的参数。

```html
<!--
    // server
    getName({
        userName: 'xxxx',
        msg: 'xxxxx'
    })
-->
<script>
    window.callback = function(data) {
        console.log(data);
    }
</script>  
<script src="xxxxxx.js?callback=getName"></script>
```

2. CORS。这个则是在服务端设置相应的规则来完成。```Access-Control-Allow-origin: 'xxxx'```、```Access-Control-Allow-Methods: 'POST'``。需要注意的是CORS有可能会触发浏览器的复杂请求校验，也就是浏览器可能会自动的发送一次options请求，来和服务端进行一个合法性的校验，来查看请求规则是否和服务端匹配，如果校验通过了，才可以发送真正的请求。

还有其他的如 document.domain、window.name等

**其他的AJAX请求Api**

fetch是新出的请求相关的api，但是浏览器的支持还需要考虑一下。不是很统一

```js
fetch('xxxxx.json').(res => {
    console.log(res);
})
```

axios。目前常用的一个api。也是基于XMLHttpRequest实现，同时也支持nodejs。目前主流吧

```js
axios.get('xxxx.json').then(res => {
    console.log(res);
})
```

#### HTTP

**状态码分类**

* 1xx 服务器收到请求

* 2xx 请求成功，如200

* 3xx 重定向，301，302

    301：永久重定向，Location重定向到新的地址。比如服务器到期，更换域名。第一次重定向打开的时候会有一个跳转，之后浏览器会缓存，下次就直接打开重定向后的地址。

    302：临时重定向，Location重定向到新的地址。

    304：资源未被修改

* 4xx 客户端错误，404
    
    404：资源没找到。

    403：没有权限。未登录，账号权限

* 5xx 服务端错误，500

    500：服务器错误

    504：网关超时

**http-methods**

* 传统的methdos

    get： 获取服务器的数据

    post：向服务器提交数据

* 现在的methods

    get：获取数据

    post：新建数据

    patch/put：更新数据

    delete：删除数据

**Restful-API**

* 传统API设计：把每个url当做一个功能

    获取数据： api/list?pageIndex=2

    用methods表示参数类型（传统api）

    post请求 /api/create-blog (创建)

    post请求 /api/update-blo?id=100（更新）

    get请求 /api/get-blog?id=100(获取)

* Restful-API设计：把每个url当做一个唯一的资源

    获取数据： api/list/2 (不使用参数)

    用methods表示参数类型（restful api）

    post 请求：/api/blog（创建）

    patch 请求：/api/blog/100（更新）

    get 请求：/api/blog/100（获取）

    
**HTTP header**

* 常见的Request-headers（请求头）

    Accept 浏览器可接收的数据格式

    Accept-Encoding 浏览器可接收的压缩算法，如gzip

    Accept-Language 浏览器可接收的语言类型，如 zh-CN

    Connection：keep-alive 一次TCP链接重复使用

    cookie

    host

    User-Agent 简称UA 浏览器信息

    Content-type 发送数据的格式。如application/json

* 常见的Response-headers（响应头）

    content-type：返回的数据类型

    content-language：返回的语言类型

    content-Encoding：返回的数据压缩格式

    cache-control：缓存规则

* 缓存相关的header

    cache-contrcol

    Exprice

    Last-Modifined    If-Modifined-since

    Etag              If-None-match

**http缓存**

* 什么是缓存？
  
    一些静态资源没必要重复获取

* 为什么需要缓存？

    让页面加载速度更快，优化用户体验、减少网络请求

* 哪些资源可以被缓存？

    静态资源：js、css、img
  
* 强制缓存

    对资源第一次请求的时候，服务端会返回cache-control，来告诉客户端是否缓存该资源。

    Cache-Control控制强制缓存的逻辑。例如Cache-Control: max-age=31536000（单位是秒）。意思是这个资源被缓存一年的时间。

    Cache-Control

        max-age：资源过期时间，单位秒

        no-cache：不用本地缓存，正常的请求资源，其他的策略按照服务器处理的来

        no-store：客户端、服务端都不走缓存。全部都请求新的资源

        private：只允许最终用户缓存

        pubilc：中间层，代理服务器都可以缓存

    Expires：控制缓存过期时间，http1.0中的规范。已被cache-control代替

* 协商缓存（对比缓存）304

    服务端来判断这个文件是否使用本地缓存

    服务端判断客户端资源，是否和服务端资源一样，如果一样则返回304，告诉客户端使用本地缓存，如果不一样，则返回200，重新请求新的资源

    Last-Modifined：资源最后的修改时间

    Etag：资源的唯一标识

#### 开发环境

* 抓包

    移动端h5页，查看网络请求，需要用工具抓包

    windows一般用fiddler

    Mac OS一般用charles

    手机和电脑连同一个局域网

    将手机代理到电脑上

    手机浏览网页，即可抓包

* webpack和babel

    ES6模块化，浏览器暂不支持

    ES6语法，浏览器并不完全支持

    压缩代码，整合代码，让网页加载更快

    @babel/core： core是babel核心，这个@babel是组的意思，这行意思是装@babel组下的core

    @babel/preset-env：preset-env是babel配置集合

    babel-loader：编译js代码，将es6编译为浏览器可以执行的js语法

```js
/**
 * 开发环境的一个简单配置
 * webpack.config.js
 */
const path = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 指定模式 prodution生产 ｜ development开发
    mode: 'development',

    // 入口文件
    entry: path.join(__dirname, 'src', 'index.js'),

    // 出口文件
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },

    devServer: {
        // 端口
        port: 3000,
        // 启动服务的目录
        contentBase: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }
        ]
    },

    // 插件
    plugins: [
        // 解析html
        new HtmlWbpackPlugin({
            // 目标文件
            template: path.join(__dirname, 'src', 'index.html'),
            // 产出的html
            filename: 'index.html'
        })
    ]
};
```

* ES6 模块化规范是什么

* webpack 生产环境配置

    mode 需要修改成为production

    devServer不需要了，因为是静态代码了，所以这个不需要了

    修改package.json build命令`"build": "webpack --config webpack.prod.js"`

```js
/**
 * 生产环境与开发环境配置的不同
 * mode为 production
 * 不需要 devServer
 * 不需要 devtool
 * 不需要 HotModuleReplacementPlugin
 * webpack.prod.js
 * 我在把这个项目build改了之后特意看了一下dist文件的大小
 * 之前的是12.6MB，修改后的为6.3MB。体积小了近一半
 */
const path = require('path');
const HtmlWbpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 指定模式 prodution生产 ｜ development开发
    mode: 'production',

    // 入口文件
    entry: path.join(__dirname, 'src', 'index.js'),

    // 出口文件
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/
            }
        ]
    },

    // 插件
    plugins: [
        // 解析html
        new HtmlWbpackPlugin({
            // 目标文件
            template: path.join(__dirname, 'src', 'index.html'),
            // 产出的html
            filename: 'index.html'
        })
    ]
};
```


#### 网页加载过程

* 从输入url到渲染出页面的整个过程

    资源形式：html代码、媒体文件（如图片、视频等）、javascript css
    
    加载过程：
    
    1. DNS域名解析：域名 -> IP地址

    2. 浏览器根据ip地址向服务器发起http请求。

    3. 服务器处理http请求，并返回给浏览器

    渲染过程1：

    1. 根据html代码生成DOM Tree

    2. 根据css代码生成CSSOM

    3. 将DOM Tree 和 CSSOM整合形成Render Tree

    渲染过程2：

    1. 根据Render Tree渲染页面

    2. 遇到`<script>`则暂停渲染，优先加载并执行js代码，完成在继续

```js
window.addEventListener('load', () => {
    // 页面的全部资源加载完成才会执行，包括图片、视频等
})
document.addEventListener('DOMContentLoaded', () => {
    // dom文档渲染完成执行，此时图片、视频等可能还没加载完
})
```

* CSS为什么放在head里？

    假设CSS放在了body的最下面。根据HTML文档构建DOM Tree，执行Render Tree。执行到下面的时候发现了CSS，解析CSSOM Tree。又重新将DOM Tree与CSSOM Tree合并生成新的 Render Tree，再次重新渲染。这又会引发页面的一次重排与重绘。

    假设CSS放在了head里。根据HTML文档开始构建，发现了css生成了CSSOM Tree，根据html生成了DOM Tree。两者合并成为Render Tree，开始渲染页面。
    
    `需要注意的是，css的加载会阻塞html的渲染。`

* JS代码为什么要放在body最下面？

    假设JS代码放在了最上面。js代码的执行会阻塞dom的渲染，此时页面看上去可能是一片空白。而如果放在body最下面，可以先保证页面中重要的部分先展示出来，之后js代码涉及到的重绘、重排不会对页面造成太大的影响。

    为什么会停止dom的渲染？如果不停止的话，dom继续渲染，渲染完成后js又对dom进行了修改，就浪费了一次不必要的渲染。


#### 前端性能优化

    原则：多使用内存、缓存或其他方法，减少cpu计算，减少网络加载耗时。
    
    - 让加载更快。减少资源体积（压缩代码，webpack，压缩图片）
    
    - 减少访问次数（合并代码，SSR服务端渲染，缓存）
    
    - 使用更快的网络CDN

    - 让渲染更快。css放在head、js放在body最下面

    - 尽早开始执行js，用DOMContentLoaded触发

    - 懒加载（图片懒加载，上滑加载更多）

    - 对DOM查询进行缓存

    - 频繁DOM操作，合并到一起插入DOM结构

    - 节流throttle 防抖debounce

#### 防抖debounce

    在input事件或者像scroll事件这种会在短时间内频繁触发的事件，如果在其中进行了网络请求等操作的话是非常浪费性能的。所以就需要在用户操作完成或者暂停后才执行，这样可以极大的节省资源。将多次操作合并

    实现思路就是，每次触发的时候都抹掉上一次的操作`clearTimeout(timer)`，然后将本次的操作推入定时器，延迟执行。

```js
function debounce(fn, delay = 500) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}

input1.addEventListener('input', debounce((e) => {
    console.log(e.target.value);
}, 600))
```

#### 节流throttle

    在监听某些频繁触发的事件时，不能频繁的触发，而是以某种频率来触发。不像防抖那样在结束后才触发。将操作频率降低

    实现思路其实和防抖差不多。只是定时任务还没执行完的时候暂停执行，等上次的任务执行完成后才开始执行下次任务。

```js
/**
 * 1.开始执行timer为null
 * 2.timer为null，不进入if继续往下执行
 * 3.将定时器id赋值给timer
 * 4.立刻又开始了频繁触发，此时因为闭包的关系开始执行return的函数，而此时因为定时器还未执行，timer有值为true
 * 5.return false不往下执行，确保delay时长内只触发一次
 * 6.定时时间到，触发定时任务。执行传入的回调函数，timer重置为null
 * 7. 2 ～ 6重复
 */
function throttle(fn, delay = 100) {
    let timer = null;
    return function () {
        if (timer) {
            return false;
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay)
    }
}

div1.addEventListener('darg', throttle(function(e) {
    console.log(e.offsetX, e.offsetY);
}, 100))
```

#### 安全

* 常见的web前端攻击方式有哪些？

    XSS注入攻击：发表的评论、回复中带有恶意脚本代码，脚本代码内获取用户cookie，发送到别人的服务器中。用户访问带有这个回复的网页，就会执行恶意代码，信息就会被泄露。

    XSS注入攻击预防：特殊字符转义。如"<" 转义为"&lt;"、">"转义为"&gt;"，转义后就成为`&lt;script&gt;&lt;/script&gt;`，直接当字符串显示，不会被执行。前端需要替换，后端也要替换。还有一个专门做预防的npm包([xss](https://www.npmjs.com/package/xss))。

    CSRF跨站请求伪造：攻击者模拟用户，来进行恶意操作。诱导用户打开恶意网站，恶意网站中有窃取用户重要网站cookie的网络请求，从而达到模拟用户的目的。

    CSRF预防：使用post接口，增加验证，例如密码、短信验证码、指纹等

* new Object() 与 Object.create()的区别

    {} 等同于new Object()，原型是Object.prototype。一般用字面量来声明的情况比较多

    Object.create(null) 创建一个空对象。传入null没有原型。如果传入其他对象，则隐式原型指向被传入的对象

    new Object() 与 Object.create()都是创建对象，但是new Object这种形式创建的对象它的原型指向object。而Object.create()如果传入的null，则它不会指向object，没有原型，只是一个空的对象

* 捕获js中的异常

```js
    try {
        // todo
    } catch(ex) {
        // 手动捕获 catch
        console.error(ex);
    } finally {
        // todo
    }

    // 自动捕获
    window.onerror = function () {}
```

* 获取url参数

```js
function query(name) {
    // https://www.baidu.com/s?ie=UTF-8&wd=asdasdasd
    // ?ie=UTF-8&wd=asdasdasd
    // ie=UTF-8&wd=asdasdasd
    let str = window.location.search.substr(1);
    // 1.匹配开始或者&符号(^|&)
    // 2.${name}=匹配传入的名称跟随着一个等号
    // 3.等号后面匹配除了&符号的任意字符，1到多次，因为要捕捉所要用括号包起来
    // 4.匹配结尾或者&符号
    // i 忽略大小写 g全局匹配 m多行匹配
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let res = str.match(reg);
    let (!res) {
        return null;
    }
    return res[2];
}
```

* flatern 数组拍平

```js
// concat 这个方法最多只可以拍平两层数组
// 如果是三层或者四层就没法在拍了，所以就要判断每个元素的数据类型，递归
function flat(arr) {
    // 先判断该数组是否是多维的，如果不是多维直接返回
    let isDeep = arr.some(item => item instanceof Array);
    if (!isDeep) {
        return arr;
    }
    // 利用数组的concat方法递归拍平
    let res = Array.prototype.concat.apply([], arr);
    return flat(res);
}
```

* unique 数组去重

```js
function unique(arr) {
    let res = [];
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item);
        }
    })
    return unique
}
function unique1(arr) {
    // return [...new Set(arr)];
    return Array.from(new Set(arr));
}
```

* Object.assign

    Object.assign不是深拷贝，严格意义上来看，它是一层浅拷贝

```js
let obj = {x: 1, b: {x: 2}, c: 3};
let obj1 = Object.assign({}, obj);
obj.b.x = 100;
console.log(obj.b.x); // 100 
console.log(obj1.b.x); // 100 
```

*  requestAnimationFrame

    要想动画流畅，更新频率要60帧/s，即16.17ms更新一次视图。一秒钟动画能动60次，和屏幕刷新的频率一样。

    setTimeout要手动控制频率，而RAF浏览器会自动控制

    后台标签或页面隐藏，RAF会暂停，而setTimeout依然执行
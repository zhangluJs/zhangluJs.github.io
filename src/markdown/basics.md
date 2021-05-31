#### JS

- 变量类型和计算

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

为什么引用类型赋值会拷贝引用地址？是因为考虑到性能或存储问题。值类型的占用空间比较少，而引用类型有可能是一个非常大的对象，而且如果直接复制的话会导致过程特别的慢。

![引用类型存储](./static/img/引用类型的存储.png)

- typeof 运算符

识别所有基本类型

识别函数

判断是否是引用类型（不可再细分 object）

- 变量计算 - 类型转换

 字符串拼接

 ==  // 除了 == null 之外。其他一律用 ===

 if语句和逻辑运算

- 原型

class 

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

- 原型链

这里用下面这段代码来解释一下原型链。

new 出来的实例“xialuo”可以访问sayHi方法，但是它本身是没有的，所以在访问的时候就在隐式原型`__proto__`属性上去找。而它的__proto__则指向了Student的prototype(`xialuo.__proto__ === Student.prototype`)。在`Student.prototype`上有sayHi方法，调用。

实例“xialuo”访问eat方法，依然是按照刚才的步骤往上查找。首先自身没有，则沿着__proto__向上寻找，这时的__proto__是Student.prototype。但是Student.prototype也没有，则继续沿着隐式原型__proto__向上查找。`Student.prototype.__proto__`指向People的Prototype，这时候找到了方法eat，调用。

如果我们访问一个没有被定义过的方法，则依然会沿着__proto__向上查找，直到访问`Object.prototype.__proto__`为null，会返回一个undefined。结合下面的代码和图片。

```js
class People {
    constructor(name) {
        this.name = name
    }
    eat() {

    }
}

class Student extends People {
    constructor(name, number) {
        super(name);
        this.number = number
    }
    sayHi() {

    }
}

const xialuo = new Student('夏洛', 100);
console.log(xialuo.name) // 夏洛
console.log(xialuo.number) // 100
console.log(xialuo.__proto__ === Student.prototype) // true
```
![原型链](./static/img/prototype.jpg)

 

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
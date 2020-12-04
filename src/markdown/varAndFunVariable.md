### js中的变量提示&一等公民函数

1. js的变量声明与函数在编译阶段都会被提升到该作用域最前面
2. 函数是一等公民，优先编辑函数

```js
console.log(a) // undefined
console.log(b) // error
var a = 10;
```

根据变量提升的规则，上面的代码编译后是这个样子的。由于变量提升，a变量被提升至最前面，此时a变量已经存在但是还未进行赋值操作，所以打印出来是undefined，而b变量没有声明过，所以报错。

```js
var a;
console.log(a);
console.log(b);
a = 10;
```



##### 看一下函数提升

```js
console.log(a); // function a
function a () {};
var a = 10;
cnosole.log(a) // 10
```

上面的代码编译后是这个样子的。其实我最开始看没明白，为什么第一个打印出来是函数a，而不是undefined。因为我理解函数被提升到最前面后，紧随其后的应该是`var a`才对。但实际情况不是这样的。`而是函数声明不仅被优先编译了，而且还会覆盖掉剩余的同名的变量声明，有点霸道了（敲黑板重点～）`。

```js
function a() {}
console.log(a) // function a
a = 10;
console.log(a) // 10
```


###### 下面几个思考的题

```js
if (!("a" in window)) {
    var a = 1;
}
console.log (a); // 这里输出undefined。其实正确情况下这里由于a被声明在了一个块里，应该报错 is not defined。但是var声明没有块级作用域，所以就这样了。好消息是es6里有let，这个问题就没了。本章不讨论var与let。
```

```js
var a = 1,
    b = function a (x) {
        x && a (--x);
    };
console.log(a); // 1。这是因为这个函数其实是个具名函数，并且被赋值给了另一个变量b。所以并没有提升。
```

```js
function a (x) {
    return x * 2;
}
var a;
console.log(a); // function a。上面解释过了“函数声明不仅被优先编译了，而且还会覆盖掉剩余的同名的变量声明”。其实写这个文章就是为了记录这句话。
```


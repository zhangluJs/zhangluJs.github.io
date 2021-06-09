*** Object.defineProperty ***

```js
/**
* 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
* 通过 Object.defineProperty 创建的对象属性可读写、枚举、设置都为false
*/ 
Object.defineProperty(objName, 'key', {
    // 是否可设置当前属性的值。默认：false
    configurable: false / true,
    // 是否可写当前属性。默认：false
    writable: false / true,
    // 是否可枚举 。默认ffalse
    enumerable: false / true,
    // 该属性的值，任何有效的javascript的值
    value: 1,
    // 访问属性时调用该方法
    get() {

    },
    // 设置属性时调用该方法
    set() {

    }
})
```

*** Object.create() ***

Object.create() 接收一个对象作为参数。该方法返回一个空的对象，对象的原型 __proto__ 指向该方法传入的那个对象

```js
let obj = Object.create({x: 1});
console.log(obj); // {}
console.log(obj.__proto__); // {x: 1}
```

*** 对象序列化 ***

使用JSON对对象进行序列化时，需要注意。值为undefined、函数的属性会丢失。特殊的值会变成null。

```js
let obj = {
    x: 1,
    y: true,
    z: () => {},
    val: undefined,
    a: NaN,
    b: Infinity
};
JSON.stringify(obj); // "{"x":1,"y":true,"a":null,"b":null}"
```

*** Array.splice() ***
个人认为splice是数组中最主要的一个方法，因为通过这个方法几乎可以实现像 push、pop、unshift、shift等一些方法

```js
let arr = [1, 2, 3];
/**
 * slice 接收两个参数 截取开始下标，截取结束下标，并且在截取时不包括结束下标 返回截取到的数组，不改变原数组
 */
arr.slice(0, 2) // 返回值[1, 2]
consoel.log(arr) // [1, 2, 3]
/**
 * splice 第一个参数截取开始下标，第二个参数截取长度，后面的可选参数是插入的属性。会改变原数组
 */
arr.splice(0, 2) // 返回值为[1, 2]
console.log(arr) // [3]
```

```js
foo();
// 函数声明式
functon foo() {} // 可以提前调用不会报错，因为函数声明提前
// 函数表达式
let foo = function () {} // 会报错，因为变量声明提升，调用foo时 值为undefined
```


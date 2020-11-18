### typescript 支持的类型

```基本类型```
```js
let isDone: boolean = false;
let age: number = 20;
let firstName: string = 'zhanglu';
let message: string = `hello, ${firstName}, age is ${age}`;
let u: undefined = undefined;
let n: null = null;
// undefined、null是子类型，所以可以赋值给任意类型。但是当开启严格模式时就不能使用了，如果一定有空值的情况就只能用联合类型来约束
let num: number = undefined;
```

```any类型```: 允许赋值为任意类型。

```js
let notSure: any = 0;

notSure.myName;
```

```联合类型```: 变量只支持某几个类型，比如number与string。

```js
let numberOrString: number | string = 'zhanglu';
numberOrString = 20;
```

```数组Array```: 每个元素类型一致

```js
let arr: number[] = [0, 1, 2, 3];
```

```元组Tuple```: 与声明数组类型，只不过指定了每个元素的类型、且顺序、类型要一一对应

```js
let arr: [string, number] = ['zhanglu', 20]
```

```interface```: 用来定义一个对象（数组、函数...）的边界。 readonly是只读属性（和其他定义不一样，这个要写在前面），表明该元素定义后无法修改。?表示该元素可有可无。需要注意的是在定义一个interface的时候每个元素以分号结尾

```js
interface Person {
    // readonly 只读属性
    readonly id: number;
    name: string;
    // ？表示可有可无
    age?: number;
}

let zhanglu: Person = {
    id: 1,
    name: '张璐'
}
```

```函数```

```js
/**
 * 函数声明式 
 * 定义函数参数的类型，以及个数
 * ?问号表示可选参数。要注意的是它只能放在最后一位
 * 函数返回的类型定义需要写在()后
 * 参数默认值和普通函数写法一样 z: number = 10
 */
function add(x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
}

let result = add(2, 3);

/**
 * 函数表达式
 * ts中的类型推断已经帮我们定义好了add的类型为一个函数（下面str的例子）
 */
const add = function(x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
}

// 定义了一个函数类型。注意这个不是es6中的箭头函数
const add2: (x: number, y: number, z?: number) => number = add;

let str = 'str';
// 报错：不能将类型“number”分配给类型“string”
str = 123;
```
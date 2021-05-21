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


```Generics``` 泛型（一） 是指在定义函数、类、接口的时候不预先指定具体的类型，而是在使用的时候在指定类型的一种特征。下面例子中的T可以理解为一个占位符。类型推论还会自动判断参数类型。

```js
function echo<T>(arg: T): T {
    return arg;
}
const str: string = 'string';
const reslut = echo(str);


// 多个参数
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

const result2 = swap(['string', 123]);
```

```泛型（二）```约束泛型 关键字 extends 关键字满足约束条件，而不是想传入什么就传入什么

```js
// 约束泛型
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

const arr1 = echoWithArr([1, 2, 3]);

interface IWithLength {
    length: number
}

/**
 * 这里只允许传入带有length属性的参数
 */
function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length);
    return arg;
}

const str = echoWithLength('str');
const obj = echoWithLength({a: 1, length: 123});
const arr3 = echoWithLength([1, 23, 4]);
```

```泛型（三）``` 泛型类 interface  相对可以创建灵活的类，在实例化类型的时候可以动态的传入不同的参数，也可以传入不同的interface ，随着传入参数的不同可以适配多变的object 甚至函数。使用这种形式就实现了泛型的意义

```js
// 定义类
class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item);
    }

    pop(): T {
        return this.data.shift();
    }
}

const queue = new Queue<number>();
queue.push(1);
console.log(queue.pop().toFixed());


const queue2 = new Queue<string>();
queue2.push('string');
console.log(queue2.pop().length);


// 定义对象
interface KeyPair<T, U> {
    key: T;
    value: U;
}

let kp1: KeyPair<number, string> = {key: 1, value: '123123'};
let kp2: KeyPair<string, number> = {key: 'string', value: 123};

let arr4: number[] = [1, 2, 3];
// 定义数组
// 这里的Array 就相当于一个interface
let arr5: Array<number> = [1, 2, 3];

// 定义方法
interface IPlus<T> {
    (a: T, b: T): T;
}

function plus(a: number, b: number): number {
    return a + b;
}

function connect(a: string, b: string): string {
    return a + b;
}
 
const a: IPlus<number> = plus;
const b: IPlus<string> = connect;
```



```类型别名&类型断言```

```js
/**
 * 类型别名
 * 最常用的场景是联合类型的时候
 */
type PlusType = (x: number, y: number) => number

function sum(x: number, y: number): number {
    return x + y;
}

// const sun2: (x: number, y: number) => number = sum;
const sun2: PlusType = sum;



/**
 * 联合类型例子
 * 下面这个函数接收的参数有可能是个字符串或者是个函数
 * 如果是字符串直接返回，而如果是函数则返回运行函数
 * 需要用类型别名声明出来，然后在接着使用
 */
type nameResolver = () => string;
//  它或者是一个字符串或者是一个返回字符串的函数
type nameOrResolve = string | nameResolver;
function getName(n: nameOrResolve): string {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}


/**
 * 类型断言
 * type assertion
 */
function getLength(input: string | number): number {
    // const str = input as String;
    // if (str.length) {
    //     return str.length
    // } else {
    //     const number1 = input as Number;
    //     return number1.toString().length;
    // }

    if ((<string>input).length) {
        return (<string>input).length;
    } else {
        return (<string>input).toString().length;
    }
}
```


```声明文件``` 在typescript中 声明文件一般以 .d.ts后缀结尾。在这个文件中声明后，在其他文件中就可以使用。就可以获得代码补全、提示等相关功能。
其他：tscconfig.json中配置相关。专门的第三方库的声明文件 DefinitelyTyped

```js
// 一般以declare声明
declare var jQuery: (Selection: string) => any;

// tscconfig.json中配置相关
{
    "include": ["**/*"]
}
```
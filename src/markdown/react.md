**状态提升**

尽量把数据绑定在父级上，分发给各个子组件

自上而下的数据流（单向数据流，双向数据绑定）

**context(环境上下文)**

用来存放数据，我理解它将数据放在顶级作用域，然后该作用域下的所有组件都可以拿到定义在context中的数据。不用在把数据从父组件一级一级的传递到孙子组件中，反之也不用一级一级的向上传递。

```js
// React.createContext()接收数据，用来当作默认数据
let {Provider, Consumer} = React.createContext();

// value接收数据
/**
 * 父
 * value存放公用数据
*/
<Provider value={params}>
  <son></son>
</Provider>

/**
 * 子
 * Consumer 返回一个表达式，表达式接收一个函数，函数的第一个变量就是我们传入的值
*/
<Consumer>
  {
    params => {
        console.log(parms)
    }
  }
</Consumer>
```

**JSX 是什么？**

JSX其实是React.createElement的一种语法糖，它看上去像是某种html的语法模版，其实这样理解我觉得也没错。它被babel转义后其实调用了React.createElement方法，该方法接收三个参数，第一个参数是标签name，第二个参数是标签上的属性（value、class...），第三个参数是标签内容。如果标签内还嵌套了其他标签，则作为第四个参数继续调用React.createElement。

```html
<!-- 这段html标签被babel转义 --> 
<h1 className="aaa" value="123" onClick={() => {this.fun()}}>123</h1>
```

```js
var _this = void 0;

/*#__PURE__*/
React.createElement("h1", {
  className: "aaa",
  value: "123",
  onClick: function onClick() {
    _this.fun();
  }
}, "123");
```

由JSX延伸出来的需要知道的点是

1. 解释了为什么绑定的事件this指向会丢失的原因。在babel编译后，this其实已经指向了另一个对象，所以在调用的时候this无法指向当前构造函数。需要我们bind将指针指回来，或者用箭头函数保留其作用域。

2. 为什么自己创建的自定义组件需要首字母大写，这是为了区分它是自定义组件还是原生的html节点。如果是自定义组件则React.createElement第一个参数是构造函数。

3. 为什么样式名要写成 className ，因为编译后与关键字class冲突

2020/12/25 今天因为组件的首字母没有大写，结果页面上报错，但是这个错误提示又和这个毫不相干。找了半天原因才发现是组件名称小写了。

**map时的key有什么作用？**

无论在vue还是react中只要用到遍历的地方，官方给的建议是需要添加key，并且这个key是唯一值。它的作用是可以优化虚拟dom算法，每个组件通过key来识别，类似数据中的id。

**受控组件与非受控组件**

受控组件是指，表单元素的值由state绑定，通过setState改变来控制表单元素

非受控组件是指，直接通过dom元素获取值，整个过程中不与 state 发生任何关系（ref）

```js
<input type="text" ref={(text) => {this.textInput = text}}>
console.log(this.textInput.value)

<input type="text" value={value} onChange={}>
console.log(this.state.value)
```

**纯函数组件**

某些组件如果只用来展示数据，而不对数据进行任何修改，这时候就可以使用函数来当作一个组件，语法上要比class组件精简的多

**简单的生命周期**

![生命周期](./static/img/react.png)

1. constructor 组件创建时调用

2. render 组件更新时调用

3. componentDidMount dom渲染后调用

4. componentUpdate 组件更新

5. componentWillunmont 组件卸载

组件触发更新（DOM、refs）的条件，传入了新的props、 setState()、 forceUpdate()// 强制调用render方法



**React Hooks**

今天学了React Hooks。我们都知道react组件分为类组件和函数组件，但是函数组件一般都只作为视图组件来使用（只用来展示），即其中不会掺杂逻辑，而且也无法掺杂逻辑。函数组件更符合react数据驱动视图的开发思路，但是函数组件一直都缺乏例如组件状态，生命周期等种种特性，函数组件没有收到开发者的青睐。而hooks的出现，就是为了使函数组件有类似类组件的一些特性。

react提供了三个hooks特性：State Hooks、Effect Hooks、Custom Hooks。

- useState：最基础的hooks。用来在函数组件中定义与管理状态。useState接收一个参数，用来作为状态的初始值，返回一个数组。下面上代码

```js
import React, {useState} from 'react';

function app() {
    /**
     * 这里可以理解为从useState中声明了一个变量count，其中传入的值为初始值
     * setCount用于专门更改状态的函数
     * useState可以声明对象类型的状态，也可以多次声明
     * const [count, setCount] = useState({
     *    count1: 0,
     *    count2: 0
     * });
     *  
     * const [count1, setCount1] = useState(0);
     * const [count2, setCount2] = useState(0);
     */
    const [count, setCount] = useState(0);

    return (
        <>
            <button onClick={() => {setCount(count + 1)}}>{count}</button>
        </>
    )
}
```

- useEffect（翻译为副作用）：可以理解为函数组件的生命周期。在函数组件中，组件挂载与状态更新每次都会触发useEffect。每次组件更新前，都会执行useEffect return出来的函数，可以简单理解为componentWillUnmount。也用来进行一些卸载等操作。之所以在重绘前进行销毁操作，是为了避免造成内存泄露。（持续更新，还在学习中...）

```js
console.log('before', position.x);
useEffect(() => {
    console.log('add', position.x);
    const getMousePosition = (e: MouseEvent) => {
        setPosition({x: e.clientX, y: e.clientY})
    }
    document.addEventListener('click', getMousePosition);
    return () => {
        console.log('remove', position.x);
        document.removeEventListener('click', getMousePosition);
    }
});

/** 
 * example
 */
useEffect(() => {
    console.log('componentDidMount...')
    console.log('componentDidUpdate...')
    return () => {
        console.log('componentWillUnmount...')
    }
});
```
- useEffect控制运行：在某些时候期望对组件的生命周期进行某些控制。比如特定的值才触发生命周期，某些值又不需要触发。可以通过给useEffect传入第二个参数来控制。第二个参数接收一个数组，当期望某个值修改时期望触发生命周期，就在数组中写入这个值。下面看例子

```js
const LikeButtons: React.FC = () => {
    const [like, setLike] = useState(0);
    const [on, setOn] = useState(true);
    useEffect(() => {
        console.log('add', position.x)
        const getMousePosition = (e: MouseEvent) => {
            setPosition({x: e.clientX, y: e.clientY})
        }
        document.addEventListener('click', getMousePosition);
        return () => {
            console.log('remove', position.x)
            document.removeEventListener('click', getMousePosition);
        }
    /** 
     * 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
     *
     * 而期望在某个值更新时才触发更新，则将这个值直接写入数组中即可。
     * 在like更改时才会触发Effect，而on更改的时候不触发
     */
    }, [like]);
    return (
        <>
            <button onClick={() => {setLike(like + 1)}}>
                {like} 👍
            </button>
            <button onClick={() => {setOn(!on)}}>
                {on ? 'ON' : 'OFF'}
            </button>
        </>
    )
}
```

- useRef：这玩意看了大半天也没理解到底是干嘛的，先放着吧

- useContext：子组件如何共享同一份数据，其实这个hook和React的Context几乎一样。先将数据从顶层灌进去，然后再从各个组件中拿出来使用。看代码吧⬇️一个简单的exempla

```js
// parent
import React, {createContext} from 'react';

// 定义需要共享的数据
const theme = {
    light: {
        color: '#000',
        background: '#eee'
    },
    dark: {
        color: '#eee',
        background: '#000'
    }
}

/**
 * 创建context，提供两个api
 * Provider 提供者
 * Consumer 使用者
 * 将这个context抛出，供子组件使用
 */ 
export const ThemeContext = createContext(theme.light);

class App {
    return (
        <div>
            /**
             * 将需要共享数据的子组件，使用context.Provider包裹，给value赋予一个初始值
             * Provider 提供者
             * Consumer 使用者
            */ 
            <ThemeContext.Provider value={theme.light}>
                <chlidren1></chlidren1>
                <chlidren2></chlidren2>
            </ThemeContext.Provider>
        </div>
    )
}


// children
import React, {useContext} from 'react';
import ThemeContext from './Parent';
function children() {
    const theme = useContext(ThemeContext);
    const style = {
        color: theme.color
        background: theme.background
    }
    renturn (
        <>
            <div style={style}>
                exempla context
            </div>
        </>
    )
}
```
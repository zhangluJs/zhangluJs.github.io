# React


### 事件绑定

在使用react绑定事件的时候，一般都需要bind的绑定一下this，下面就来说一下三种不同的事件调用方式。以及区别。

下面这种方式可以成功的调用定义的方法，但是有一个小的缺点，就是每点击一次，都会重新绑定一下bind。
所以这里建议改写为 `this.changeName = this.changeName.bind(this);`。这样只是绑定一次，每次触发即可。或使用箭头函数来定，箭头函数中的this不会改变。

```js
<p onClick={this.changeName.bind(this)}>{this.state.name}</p>
// 或使用箭头函数
changeName = () => {
    // todo something
}
```

1. React事件中event并不是原生的event对象，而是react封装后的event对象(SyntheticEvent)。

2. React中想要获取原生event可以通过event.nativeEvent。原生Event对象是MouseEvent。

3. React16中所有的事件都是被挂载在document上。 React17中事件绑定在了Root节点上（`<div id="root"></div>`）。

4. 它不是原生DOM事件。可以通过event.nativeEvent.currentTarget来查看。


### 受控组件

- 个人理解，受控组件就是直接通过修改this.state来完成数据的修改，就是受控组件。（类似双向数据绑定）

### 父子组件通讯

- 父组件传入自定义属性、事件，子组件中通过props接收事件与属性。

### setState

* 不可变值

    为什么要用不可变值？

    为了性能优化。在react中有shouldComponentUpdate钩子，这个钩子决定了视图需不需要更新。返回true更新，否则不更新。`一般优化的场景都是通过shouldComponentUpdate对比新旧的props或state来完成，如果两者一致则不重新渲染，否则就重新渲染。但是如果使用了push、pop等对原数据有破坏性操作的方法后，它在对比时两者的值是相同的，则视图就不会更新。所以对引用类型进行修改时，一定要使用不可变值`

    不要直接对state的值进行修改，什么时候需要修改再通过setState来修改!!!setState时不要修改原state的值，而是直接返回一个全新的值!!!

```js
// 不可变值（函数式变成，纯函数） - 数组
let list4Copy = this.state.list4.slice();
list4Copy.splice(2, 0, 'a');
this.setState({
    // 追加，使用concat是因为concat不会修改原数组，而且是返回一个全新的数组。这就是不可变值的意思
    list1: this.state.list1.concat(100),
    // 另一种追加方式
    list1: [...this.state.list1, 100],
    // 截取，slice也不会改变原数组，而且返回一个新的数组
    list2: this.state.list2.slice(0, 3),
    // 筛选。不会改变原数组，返回一个新的数组
    list3: this.state.list3.filter(item => item >= 100),
    // 其他操作。深拷贝一个新的数组，然后对数组进行操作，这样依然不会影响原数组
    list4: list4Copy
});
// 不能直接对this.state.list 进行push、pop、shift、unshift等具有破坏性的操作，这样违反不可变值

// 不可变值 - 对象
this.setState({
    // 通过Object.assign生成一个新的对象，来修改obj1.a的值，达到不可变值的目的
    obj1: Object.assign({}, this.state.obj1, {a: 100}),
    // 解构生成一个新的对象，来修改obj2的a属性
    obj2: {...this.state.boj2, a: 100}
});
```

* 可能是异步更新

    为什么它会是异步的？

    为了提升性能而进行批量处理。这是因为setState改变了状态会导致重新渲染，这是非常耗费性能的。所以就需要异步以及批量处理。其实这里和vue的$nextTick一个道理

    在自定义DOM事件、setTimeout定时器中，setState是同步的（我猜想可能因为它们是宏任务所以在执行的时候就同步了）。如果直接使用可能是异步的。

```js
// 异步输出
this.setState({
    count: this.state.count + 1
});
cosnole.log(this.state.count); // 0

bodyClickHandler = () => {
    // 同步输出
    this.setState({
        count: this.state.count + 1
    });
    cosnole.log(this.state.count); // 1
}
componentDidMount() {
    document.body.addEventListener('click', this.bodyClickHandler);
}
```

* 可能会被合并

    为什么会被合并？

    因为setState是异步，而异步处理时以下面的例子为例，这是count还是0，所以它们都是0+1，所以都是1。

    传入对象，会被合并。

    传入函数，不会被合并。

```js
// 传入对象，会被合并。执行结果 只+一次1。 输出 1
this.state = {count: 0}; 
this.setState({
    count: this.state.count + 1
});
this.setState({
    count: this.state.count + 1
});
this.setState({
    count: this.state.count + 1
});

// 传入函数，不会被合并。输出3
this.setState((prevState, props) => {
    return {count: prevState.count + 1}
});
this.setState((prevState, props) => {
    return {count: prevState.count + 1}
});
this.setState((prevState, props) => {
    return {count: prevState.count + 1}
});
```

* 生命周期

    挂载时

1. constructor

2. render

    React更新DOM和refs

3. componentDidMount

    更新时 setState forceUpde

1. render

    React更新DOM和refs

2. componentDidUpdate

    卸载时

1. componentWillUnmount



* 父子组件生命周期调用顺序

    如果一个组件里包涵了一个子组件，那么它们的生命周期是如何触发的？是穿插进行。

    挂载时： 父constructor -> 父render -> 子constructor -> 子render -> 子componentDidMount -> 父componentDidMounted

    更新时：父render -> 子render -> 子componentDidUpdate -> 父componentDidUpdate


### 高级特性

* 函数组件

    纯函数，输入props，输出jsx。对值没有任何的修改

    没有实例，没有生命周期，没有state

    如果只是一个纯展示的组件，没有任何逻辑就可以使用函数组件

* 非受控组件

    非受控组件的值不受state的控制，需要从DOM上来获取。通过React.createRef()创建，使用ref与节点绑定。

    哪些场景需要使用非受控组件？一定要操作DOM才能获取信息的时候，比如 input type="file"的时候，必须拿DOM上的files属性，才可以获取到文件信息。

    优先使用受控组件，符合React设计原则。

```js
this.state = {
    name: 'zhangsan'
}
// 创建ref
this.nameInputRef = React.createRef();
// 指定默认值 绑定ref
<input defaultValue={this.state.name} ref={this.nameInputRef}/>
// 通过value获取当前ref的值
this.nameInputRef.current.value

// 或

<input type="text" ref={(text) => {this.nameInputRef = text}} />
// this.nameInputRef.value
```
    ref

    defaultValue defaultChecked

    手动操作DOm元素

* Portals

    可以指定某个节点或者组件插入的位置，和Vue3的Teleport功能类似。

    它接收两个参数，第一个是正常的节点，第二个是你要插入的节点。如下面的代码。`题外话，下面代码中的{this.props.children}类似于vue中的slot。可以在父节点中写入其他任意内容。会在这里展示出来。`

    使用场景：父组件z-index值太小、position:fixed需要放在body第一层级

```js
// 需要使用react-dom下的recate-portals
import ReactDOM from 'react-dom';
render() {
    return ReactDOM.createPortals(
        <div calssName="model">
            {this.props.children}
        </div>,
        document.body // document.getElementById('xxxx')
    )
}
```

* context

    状态提升的另一种表现吧。把多个子级需要使用的值提到最外层。通过创建context，将值灌入。之后所有子级组件都可以使用。

    使用场景。主题、语言设置等。 通过React.createContext()定义。provider注入、Consumer消费（获取这个值）

```js
// 定义context
const ThemeColo = React.createContext('light');
// 父
this.state = {
    theme: 'light'
}
<ThemeColo.provider value={this.state.theme}>
    <Toolbar></Toobar>
</ThemeColo.provider>

// 子 函数组件获取方式
function Toolbar(props) {
    return <ThemeColo.Consumer>
        {value => <p>this is then {value}</p>}
    </ThemeColo.Consumer>
}
// 子 class组件获取方式
class ToolBar extends React.Component {
    redner() {
        const theme = this.context;
        return <div>
            {theme}
        </div>
    }
}
```

* 异步组件

    React的异步组件大体上和vue类似。通过React.lazy方法来完成。该方法接收一个函数，这个函数返回一个import。需要搭配Suspense使用。这个Suspense和Vue3的Suspense类似。组件没有加载完成时会先显示fallback中的内容。fallback可以是一个组件，用来展示组件未加载完成时的默认样式。

```js
import React from 'react';

const LazyDemo = React.lazy(() => import('./xxxx.js'));

render() {
    return <div>
        <React.Suspense fallback={<div>loading...</div>}>
            <LazyDemo />
        </React.Suspense>
    </div>
}

```

* 性能优化

SCU 

> 在React中只要父组件有更新。子组件默认的就全部更新。无论该子组件状态是否有修改。shouldComponentUpdate默认返回true(渲染)。

父组件有更新会触发render的渲染，render又会触发所有子组件的渲染。所以无论子组件的状态有没有修改，都会重新触发渲染。所以性能优化对于React更加重要！！！

可以通过对比前后的props或state来决定是否渲染。SCU 一定要每次都用吗？需要的时候才优化，不需要的时候就不优化。

- PureComponent class组件的做了浅比较的SCU

- memo 函数组件SCU

```js
shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data !== this.state.data) {
        return true; // 如果两次的值不一致就渲染
    }
    return false; // 不重复渲染
}

// 错误的用法。push会将原先的list修改，这样在shouldComponentUpdate对比时新旧的值就会相同
this.setState({
    // 直接修改了原数组
    list: this.state.list.push({}) 
})
// 正确的用法
this.setState({
    // 不会对原数组有影响 不可变值 
    list: this.state.list.concat({}) 
})
```






    高阶组件HOC

    Render Props

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
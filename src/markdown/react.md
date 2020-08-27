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

2. componentDidMount dom渲染后调用

3. componentUpdate 组件更新

4. componentWillunmont 组件卸载

组件触发更新（DOM、refs）的条件，传入了新的props、 setState()、 forceUpdate()// 强制调用render方法



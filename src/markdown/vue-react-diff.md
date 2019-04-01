
## 生命周期

vue与react都提供了生命周期钩子，在供我们在组件不同状态时使用，来完成不同的功能。这里就先介绍一下vue与react中生命周期的异同之处。

**vue**

- beforeCreate  实例刚刚初始化

- created 实例初始化完成，此时event/watch都还没绑定，$el还不存在

- beforeMount 模板编译/数据挂载之前

- mounted 模板编译/数据挂载完成

- beforeUpdate 子组件数据更新之前

- updated 子组件更新后

- beforeDestory 实例销毁之前

- destory 实例销毁后

这篇文章写的不错，可以参考一下（[详解vue生命周期](https://www.webpackjs.com/)）。

**React**

> 一个React组件的生命周期分为三个部分：挂载期（Mounting）、存在更新期（Updating）和销毁时（Unmounting）。

- constructor 当一个组件实例被创建并且插入到DOM中

```js
constructor(props) {
    // super(props)用来调用基类的构造方法(constructor())
    // 也将父组件的props注入给子组件，功子组件读取(组件中props只读不可变，state可变)。
    super(props); // 不能缺少
    this.state = {
        color: 'red'
    };
}
```

- componentWillMount 组件将要挂载，类似vue中的beforeMount

- componentDidMount 组件挂载完成，在这里调用一些初始化函数或者ajax请求，返回数据。setState会被重新渲染。类似于vue中的mounted

- componentWillReceiveProps(nextProps)  在react的componentWillReceiveProps(nextProps)生命周期中，可以在子组件的render函数执行前获取新的props，从而更新子组件自己的state。 这样的好处是，可以将数据请求放在这里进行执行，需要传的参数则从componentWillReceiveProps(nextProps)中获取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担。

- shouldComponentUpdate(nextProps, nextState) 这个生命周期钩子在每次render前都会被调用。没有导致state的值发生变化的setState会导致重渲染，组件的state没有变化，并且从父组件接受的props也没有变化，也会重新渲染。所以我们就要通过该钩子来对性能进行一些优化。它接受两个参数，分别是下一个props以及下一个state。可以通过判断当前值与下一个值是否相等，来决定是否渲染。它返回一个布尔值，返回false则阻止接下来的render()渲染，true则照常重新渲染。这篇文章对该函数的讲解浅显易懂，可以看看[【react】利用shouldComponentUpdate钩子函数优化react性能以及引入immutable库的必要性](https://www.cnblogs.com/penghuwan/p/6707254.html)。

- componentWillUpdate 组件更新前调用，类似vue的beforeUpdate

- render 渲染组件

- componentDidUpdate 组件更新后调用，类似vue的update

- componentWillUnmount 组件销毁前调用，类似vue的beforeDestory

## 父子通信

**vue**

```js
// parent
<template>
    <child msg="msg" @changeMsg="changeMsg"></child>
</template>
<script>
import child from './child.vue';
export default {
    name: 'parent',
    data() {
        return {
            msg: '你是子组件‘
        };
    },
    components: {
        child
    },
    methods: {
        changeMsg(prop) {
            this.msg = prop;
        }
    }
};
</script>

// child
<template>
    <p @click="changeMsg">{{msg}}</p>
</template>
<script>
export default {
    name: 'child',
    props: [{
        msg: {
            type: String,
            default: '我是个组件'
        }
    }],
    methods: {
        changeMsg() {
            this.$emit('changeMsg', '你是父组件');
        }
    }
}
</script>
```

**React**

```js
// parent

import React from 'react';
import Child from './chiild';

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '你是子组件';
        }
        this.changeMsg = this.changeMsg.bind(this);
    }
    changeMsg(props) {
        this.setState({
            msg: props
        })
    }
    render() {
        return (
            <Child msg={this.state.msg} callback={this.changeMsg}></Child>
        )
    }
}

// child
import React from 'react';
export default class Child extends React.Component {
    constructor(props) {
        super(props);
    }

    changeMsg = () => {
        this.props.callback('对，我是子组件')
    }
    
    render() {
        return (
            <div>
                <p>{this.props.msg}</p>
                <button onClick={this.changeMsg}></button>
            </div>
        );
    }
}
```
整体看下来，自我感觉vue与react的父子通信的思路差不多，都是父组件向子组件传递一个自定义属性，然后由子组件接收。子组件向父组件通信则是都是调用自定义事件，调用父组件中的方法来完成参数的修改。
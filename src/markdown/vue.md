# vue

* watch深度监听

    watch深度监听一个对象，需要写handler,deep。oldval无法获取，因为指针相同，此时已指向了新的值

```js
/**
 *  city : {
 *      name: '北京'
 *  }
 */
watch: {
    city: {
        handler(newVal, oldVal) {
            // 引用
        },
        deep: true
    }
}
```

* v-if v-for

    不建议v-for与v-if一起使用，v-for的优先级要高于v-if。v-for在循环时每一次都要判断v-if，浪费性能。建议v-if放在下一层。

* vue事件

    通过$event传入事件对象。事件对象的原型指向原生的事件对象。事件被挂载到当前元素

```js
// <div @click="increment($event)">increment</div>
methods: {
    increment(event) {
        // 指向原生事件
        console.log(event.__proto__.prototype);
        console.log(event.target); // <div @click="increment($event)">increment</div>
        console.log(event.currentTarget);
    }
}
```

* 事件修饰符

```html
<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis">跳转</a>
<!-- 阻止默认行为，表单提交重载 -->
<form @submit.prevent="doThis">跳转</form>
<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThis">跳转</a>
```

* 表单修饰符

```html
<!-- lazy类似于防抖 -->
<input v-model.lazy="num"/>
<!-- trim去除空格 -->
<input v-model.trim="num"/>
<!-- number限制只能输入数字 -->
<input v-model.number="num"/>
```

* 自定义事件

    可以直接把事件绑定在Vue的实例上，通过$emit注册，$on来触发，$off解绑。无论是什么层级都可以触发。相当于绑定在了全局上

```js
// event.js
import Vue from 'vue';
export default new Vue();

// index.vue
import event from './event';
import iNdex from './index2.vue';
export default {
    data() {
        return {
            num: 0
        }
    },
    methods: {
        changeinput() {
            // 注册了自定义事件handleTitle
            event.$emit('handleTitle', this.num);
        }
    }
}

// index2.vue
import event from './event';
export default {
    name: 'demo',
    data() {
        return {
            title: '',
        };
    },
    mounted() {
        // 将自定义事件绑定在自身实例的方法上。
        event.$on('handleTitle', this.setTitle);
    },
    methods: {
        setTitle(title) {
            this.title = title;
        }
    },
    beforeDestroy() {
        // 及时销毁，将自定义事件解绑，否则会造成内存泄露
        event.$off('handleTitle', this.setTitle);
    }
};
```

* 生命周期

    create与mounted有什么不同？ create是当前实例刚刚声明，组件还没渲染，正在初始化实例。mounted是组件渲染完成了，

挂载阶段

    beforeCreate

    created：刚把vue实例初始化完成，还没有开始渲染。

    beforeMount

    mounted：页面已经渲染完毕

更新阶段

    beforeUpdate

    updated

销毁阶段

    beforeDestroy：解除绑定 销毁子组件以及事件监听

    destroy

* 父子组件生命周期调用顺序

    如果一个组件里包涵了一个子组件，那么它们的生命周期是如何触发的？是穿插进行。

    渲染时。父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子create -> 子beforeMount -> 子mounted -> 父mounted

    更新时。影响父组件 父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

    更新时。不影响父组件 子beforeUpdate -> 子updated

    销毁时。父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed

```js
// parent Components
created() {
    console.log('index created');
},
mounted() {
    console.log('index mounted');
},
beforeUpdate() {
    console.log('index beforeUpdate');
},
updated() {
    console.log('index updated');
}

// children Components
created() {
    console.log('index2 created');
},
mounted() {
    console.log('index2 mounted');
},
beforeUpdate() {
    console.log('index2 beforeUpdate');
},
updated() {
    console.log('index2 updated');
}

//  console
// index created
// index2 created
// index2 mounted
// index mounted
```

* 自定义 v-model

    对model这个options进行配置，prop需要v-model的值，这里是text1。以及触发的自定义事件event，这里是change1。表单元素上进行相应的事件触发，以及需要使用:value而不是v-model

```js

// 父
<p>v-model高级特性{{name}}</p>
<custom-model v-model="name" />

// 子custom-model
// html节点
// <input
//     type="text"
//     :value="text1"
//     @input="$emit('change1', $event.target.value)">
export default {
    model: {
        prop: 'text1',
        event: 'change1'
    },
    props: {
        text1: {
            default: '',
            type: String
        }
    }
}
```

* $nextTick

    Vue是异步渲染的，data改变了之后，DOM不会立刻渲染。$nextTick是在DOM渲染后被触发，获取最新的DOM节点。

```
<div v-if="showDiv" ref="myDiv"></div>
this.showDiv = true;
// this.$refs.myDiv false
```

* slot

    slot：插槽。父组件可以自定义的往子组件里插入一段内容，子组件通过`<slot>`标签来接收。

    作用域插槽。获取子组件的数据来供父组件调用。关键字v-slot。子组件上需要自定义属性

```html
<!-- 父 -->
<template v-slot="data">{{data.name}}</template>
<!-- 子 -->
<slot :data="myDate"></slot>
```

    具名插槽。 子name=“header”  父v-slot：header

```html
<!--父-->
<custom-model v-model="name" >
    <p>这是个slot{{num}}</p>
</custom-model>
<!--子-->
<div>
    <slot>默认内容，如果没有设置内容时，显示这些内容</slot>
</div>
```

* 动态组件

    无法确定要渲染的组件，就可以用动态组件

```html
<component :is="component-name"></component>
```

* 如何加载异步组件/按需加载

    在页面中，有可能会引用一个比较大的组件，比如echarts等等，如果一次性全部加载的话会非常影响体验。需要等所有的组件加载完成。异步组件就是通过import方法，在使用这个组件的时候才开始加载进来。

```html
<form-demo v-if="showFormDemo"></form-demo>
<button @click="showFormDemo = true;">shou form demo</button>
```
```js
export default {
    components: {
        formDemo: () => import('../../formDemo')
    }
}
```

* keep-alive

    组件缓存。频繁切换但是不需要重新渲染的时候，需要用把组件缓存起来。

* mixin

    多个组件有相同的逻辑，抽离出来复用。可以理解为一个公共的options配置文件。需要用mixins来注册。可以有多个，它们之间会合并。

    缺点：变量来源不明确，不利于阅读。 多mixin命名冲突。mixin和组件可能出现多对多的关系，复杂度较高。

```js
// file mixin.js
export default {
    data() {
        return {
            city: '北京'
        }
    },
    methods: {
        showName() {
            console.log(this.city)
        }
    },
    mounted() {
        console.log('mixin mounted', this.name);
    }
}
// file common.vue
<div>{{name}}{{city}}</div>
import mixins from './mixin.js';
export default {
    mixins: [mixins],
    data() {
        return {
            name: '夏洛'
        }
    },
    mounted() {
        console.log('mixin mounted', this.name);
    }
}
```

* Vue性能优化

    keep-alive、动态组件、异步组件

### Vuex

*基本概念*

    state

    getters

    action 

    mutation

用于vue组件

    dispatch

    commit

    mapState

    mapGetters

    mapActions

    mapMutations

### Vue-router使用

* 路由模式

    hash模式（默认）。如http://www.baidu.com/#/user/10。#号后面的就是hash

    h5 history模式，如http://www.baidu.com/user/10。没有#号

    h5 history需要server端支持，因此没有特殊的需求可选择前者。 

* 路由配置

    动态路由：动态路径参数以冒号开头。能命中'/user/10' 'user/20'等格式的路由。获取参数$route.params.id

```js
// file router.js
const routes = [
    {
        path: '/user/:id',
        components: User
    }
]
// template
{{$route.params.id}}
```
    
    懒加载：按需加载

```js
const routes = [
    {
        path: '/',
        components: () => import('./../xxxx')
    },
    {
        path: '/feedback',
        components: () => import('./../xxxx')
    }
]
```

### Vue原理

* Vue响应式

    核心API - Object.defineProperty

    `Object.defineProperty`：接收三个参数，要监听的对象，要监听的对象的属性名称，关于这个属性的配置对象。

    Object.deineProperty缺点：1.深度监听，递归到底，一次计算量大。2.无法监听新增属性/删除属性（Vue.set Vue.delete）;3.无法监听数组

```js
let obj = {};
let name = 'zhangsan';
Object.defineProperty(data, 'name', {
    get() {
        console.log('get');
        return name;
    }
    set(newVal) {
        console.log('set');
        name = newVal;
    }
})
```

* 虚拟DOM（Vitrual DOM）和 diff

    Vitrual DOM用js模拟DOM结构，可以把dom结构看作是一段数据，通过操作这段数据，来完成对dom的操作(通过snabbdom学习vdom)。

    新旧vnode对比，得出最小的更新范围，最后更新DOM

    数据驱动视图的模式下，有效控制DOM操作

```js
<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size:12px">
        <li>a</li>
    </ul>
</div>
let vdom = {
    tag: 'div',
    props: {
        id: 'div1',
        className: 'container',
    },
    children: [
        {
            tag: 'p',
            children: 'vdom'
        },
        {
            tag: 'ul',
            props: {style: 'font-size:12px'},
            children: {
                tag: 'li',
                children: 'a'
            }
        }
    ]
}
```

* diff算法概括。描述一下～

时间复杂度O(n)

1. 只比较同一层级，不跨级比较

2. tag不同，则直接删掉重建，不再深度比较

3. tag和key相同，则认为是相同节点，不再深度比较

* snabbdom 细节

h函数生成一段vnode虚拟dom结构数据。

patch函数功能，将vnode渲染到空的dom元素中，或更新已有dom元素。

patchVnode函数。下面这几条

1. 判断vnode.text是否为空，如果text有值，则说明children为空。并且两个old.text !== vnode.text。则移除oldnode。

2. 如果vnode.text为空。则新旧vnode对比是否有children，如果两者都有children，并且不相等，则updatechildren

3. 如果新的vnode有children，旧的vnode没有children，则直接添加addVnodes

4. 如果新的vnode没有children，旧的vnode有children，则直接删除removeVnodes

    updatechildren方法对比细节。old start === new start、old end === new end、old start === new end、 new start === old end。如果都没有匹配到，则拿新节点的key匹配老的节点，如果没匹配到，则插入。如果匹配到了则patchVnode。

    v-for中key的使用。因为diff算法中需要拿key来对比，所以key必须要有，而且必须是唯一值。如果用index作为key，其中新插入了一个节点，那么之后的节点因为index的改变都会认为自己有更新，就会重新创建dom渲染。

* 模版编译

```js
// 模版
let template = `<p>{{message}}</p>`;
// 编译后
with(this) {return _c('p', [_v(_s(message))])};
// 去掉简写
with(this) {return createElement('p', [createTextNode(toString(message))])};

let template1 = '<input type="text" v-model="name">';
let msg = "关于双向数据绑定的节点，比如这个input，在编译后自动添加了input事件，在触发事件的时候重新赋值。这时结合Object.defineProperty就可以实现双向数据绑定。"
// 编译后
with(this) {
    return createElement('input',{directives:[{name: "model", rawName:"v-model"}.....],on:{
        "input": function($event){
            if ($event.target.composing) return;
            name=$event.target.value;
        }
    }})
}

```

    模版编译为render函数，执行render函数返回vnode。

    基于vnode在执行patch和diff。

    vue组件可以用render代替template。render是比较高级的写法，但是比较难读。

```js
export default {
    // template: '<div>xxxxx</div>',
    render(createElemenet) {
        return createElemenet('div', [createTextNode(toString(message))])
    }
}
```

总结

1. 响应式：Object.definedProperty，监听对象。getter，setter进行某些操作。

2. vue模版编译：编译为类似于h函数的一种写法。只不过在vue中是createElement。执行render函数返回vnode，虚拟dom。

3. vdom：patch(ele, vnode)和patch(vnode, newVNode);

Vue组件渲染/更新过程

初次渲染

1. 将模版解析成为render函数（vue-loader）；

2. 触发响应式，监听data属性getter，setter；

3. 执行render函数，生成vnode，patch(ele, vnode)；

更新过程

1. 修改data，触发setter；

2. 重新执行render函数，生成newnode；

3. patch(vnode, newnode)；

![渲染/更新过程](./static/img/vue-exec.png)

* 异步渲染

    vue的视图渲染是异步的。

    多次date修改汇总，只渲染一次，减少DOM操作，提高性能
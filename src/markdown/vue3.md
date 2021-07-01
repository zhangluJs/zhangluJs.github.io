# Vue3

### Vue3比Vue2有什么优势？

> 这些解释都很官话，不过了解了Composition API后更好的代码组织、更好的逻辑抽离确实很直观。

性能更好

体积更小

更好的ts支持

更好的代码组织

更好的逻辑抽离

### 生命周期

* Options API生命周期 和vue2大体是一样的，区别在于组件销毁时的生命周期名称修改了。

    beforeDestroy 改为 beforeUnmount

    destoryed 改为 unmounted

* Composition API生命周期。其实和vue2也差不多一样，只是需要在setup生命周期中调用

    setup等价于 beforeCreate和created。

    其他的生命周期大体相同，不过前面需要加`on`关键字。如果两种api都写了执行顺序是setup里执行一下，options api执行一下

```js
// setup 等于beforeCreate和created
setup() {
    console.log('this is setup'); // 1
    onBeforeMount(() => {
        console.log('this is onBeforeMount'); // 4 
    });
    onMounted(() => {
        console.log('this is onMounted'); // 6
    });
    onBeforeUpdate(() => {
        console.log('this is onBeforeUpdate');
    });
    onUpdated(() => {
        console.log('this is onUpdated');
    });
    onBeforeUnmount(() => {
        console.log('this is onBeforeUnmount');
    });
    onUnmounted(() => {
        console.log('this is onUnmounted');
    })
},
beforeCreate() {
    console.log('this is beforeCreate'); // 2
},
created() {
    console.log('this is created'); // 3
},
beforeMount() {
    console.log('this is beforeMount'); // 5
},
mounted() {
    console.log('this is mounted') // 7
},
```

### Composition API是什么？

> 合成函数。将逻辑抽离出去成为一个一个相对独立的部分（函数），每个部分有自己独立的生命周期、自己独立的computed、自己独立的数据。然后在将不同的部分组合（setup）使用形成所需要的逻辑。这样就不用像opsitons API那样，全部都走一个生命周期、computed等，一旦逻辑复杂代码量大就会稍微难维护一些。

### Composition API 对比 Options API

- Composition API：

1. 更好的代码组织。在Options API中，属于同一块的逻辑处理可能散落在`methods`、`computed`、`watch`、`mounted`...中，处理不是很方便。而Composition API可以将这些逻辑放在同一个地方

2. 更好的逻辑复用

3. 更好的类型推导

### ref toRef toRefs

- ref

    ref：生成值类型的响应式数据。可用于模版和reactive，通过.value修改值。在模版中不需要使用.value访问。

    ref声明的变量名称建议加上后缀Ref，这样方便区分。在js中访问或修改需要通过.value。在模版中直接使用即可。别忘了需要在setup中return出来。

    reactive接收一个对象或数组作为参数。可以直接访问该对象来完成访问或者修改。当然了它也可以接收一个基本类型，不过只会在初次渲染的时候访问，之后修改它，不会触发视图更新。同样的也需要在setup中return出来。

> 总结一下ref和reactive：reactive和ref都是创建响应式对象的方式，相当于vue2的data。如果要用composition API，就必须要用这种方式创建对象。composition API不支持vue2 的data。

```js
// template
<template>
    <p>Ref demo</p>
    <p>{{ageRef}} {{state.name}}</p>
    <input type="text" v-model="state.name">
    <div>{{car.name}}{{car.price}}</div>
</template>
// js
setup() {
    const ageRef = ref(20);
    const nameRef = ref('lulu');
    const state = reactive({
        name: nameRef
    });
    const car = reactive({
        name: '奥迪tt',
        price: 140000
    })
    setTimeout(() => {
        ageRef.value = 30;
        nameRef.value = 'xixi';
        console.log(ageRef);
    }, 3000);
    return {
        ageRef,
        state,
        car
    };
}
```

- ref补充：它依然可以获取一个节点，和之前一样需要在节点上绑定对应的`ref`属性。不同的是声明这个ref的时候需要传入null，访问也是通过.value。也别忘了return出来

```js
<template>
    <p ref="elemRef">my p tag</p>
</template>
setup() {
    const elemRef = ref(null);
    onMounted(() => {
        console.log(elemRef.value); // <p ref="elemRef">my p tag</p>
    })
    return {
        elemRef
    }
}
```

* toRef

    针对一个响应式对象(reactive)的属性创建一个ref，具有响应式，两者保持引用关系。

```js
const state = reactive({
    name: 'lulu',
    age: 20
});
const name = toRef(state, 'name');
return {
    // 这个name具有响应式。
    // name.value 或者 state.name 的修改都会触发视图的更新
    name
}
// 或
return toRef(state, 'name');
```

* toRefs

    将整个响应式（reactive）对象变成普通对象，并且每个属性都是ref。（目前看只是为了解构引用方便些）。

    解构出来的ref与reactive保持引用关系。

```js
const state = reactive({
    name: 'lulu',
    age: 20
});
// toRefs返回的是一个对象，每个对象的属性都是一个ref。
const stateAsToRefs = toRefs(state);
// 下面这两种修改方式等价
// state.name = 'xixi'
// stateAsToRefs.name.value = 'xixi'。// 由于是个ref所以需要.value修改
return stateAsToRefs;
// 或
return toRefs(state);
```

### ref toRef toRefs reactive的最佳使用方式

- 用ref做值的响应式 用reactive做对象的响应式

- 用toRef做某一个reactive的某个属性返回，用toRefs做某一个reactive的返回。这样解构不会丢失响应式，模版使用更简洁。

- ref变量命名都使用Ref后缀`const ageRef = ref(20)`

- 合成函数返回响应式对象时，使用toRefs。这样有助于使用方解构。

### 为什么需要ref？

返回值类型，会丢失响应式。所以要用ref来绑定响应式的值类型。灵魂反问，那我使用reactive不行吗？同样可以实现响应式，干嘛还单独用一下ref???。因为`在setup、computed、合成函数中都有可能返回值类型`。比如下面这个代码

```js
setup() {
    let state = reactive({
        age: 20
    });
    // 这里就返回了值类型，并且这种场景还很常见
    let nextAge = computed(() => {
        return state.age + 1;
    })
}
```

### 为什么ref需要.value？

1. 因为ref是一个对象（用ref声明的变量返回一个对象，值就存储在value这个属性上）不丢失响应式，value存储值。

2. 通过.value属性的get和set实现响应式（这里其实就相当于vue2.x的data。需要监听对象的某个属性。所以ref会返回个对象，所以值在value上）。

3. 用于模版或者reactive时不需要.value，其他情况下需要

### 为什么需要toRef和toRefs？

初衷：不丢失响应式的情况下，把对象数据分解/扩散。

前提：针对响应式（reactive）对象，而不是普通对象

### Vue3升级了哪些重要的功能？

1. createApp。初始化时的区别。

```js
// vue2.x
const app = new Vue({/* ... */});
// vue3
const app = vue.createApp({/* ... */});

// vue2.x
Vue.use(/* ... */);
Vue.mixin(/* ... */);
Vue.components(/* ... */);

// vue3
app.use(/* ... */);
app.mixin(/* ... */);
app.components(/* ... */);
```

2. emits属性。vue3新增

父子组件通讯。需要emits注册一下自定义事件，通过emit触发，这个emit在setup的第二个参数里。

```js
// 父组件
<hello :msg="msg" @sayHello="sayHello"></hello>
// 子组件
export default {
    name: 'hello',
    props: ['msg'],
    // 注册一下自定义事件
    emits: ['sayHello'],
    setup(props, {emit}) {
        // 触发自定义事件，并传递参数
        emit('sayHello', 'bbb');
    }
}
```

3. 多事件处理

```html
<button @click=" two($event), one($event)">btn</button>
```

4. Fragment

vue3不需要再像vue2中每个模版只能有一个根节点。vue3中可以有多个

```html
<!-- vue2.x -->
<template>
    <div>
        <p></p>
        <p></p>
    </div> 
</template>
<!-- vue3 -->
<template>
    <p></p>
    <p></p>
</template>
```

5. 移除.sync

```html
<!-- vue 2.x -->
<my-component :title.sync="title"></my-component>
<!-- vue3 -->
<my-component v-model="title"></my-component>
```

6. 异步组件语法调整

```js
// vue2.x
new Vue({
    // ...
    components: {
        'my-components': () => import('./my-async-components.vue')
    }
})
// vue3
import {createApp, definedAsyncComponent} from 'vue';
createApp({
    components: {
        'my-components': definedAsyncComponent(() => {
            import('./my-async-components.vue')
        })
    }
})
```

7. 移除filter

8. teleport

    新增内置组件teleport，可以将该组件插入根节点(#app)以外的容器中。在实际项目中有很多dialog（弹框）的功能。如果根节点的样式有调整，那么dialog的遮罩层将不能完全覆盖，这时就可以用teleport将节点插入其他不受影响的节点中如body。我们可以通过定义它的to属性来指定插入的容器。

```html
<teleport to="body" or to="#container">
    <div>假设这是一个弹框</div>
</teleport>
```

9. Suspense

    新增内置组件Suspense，它内部接受两个具名slot，一个slot为异步组件，另一个为异步组件加载完成前的展示组件（loading）。下面就是suspense的一个简单使用方式，在`async-componens`异步组件没有加载完成时，会展示fallback中的内容，当异步组件加载完成时会显示组件。

> 其实这个功能类似于element-ui中的`v-loading`

```html
<suspense>
    <template #default>
        <async-componens />
    </template>
    <template #fallback>
        loading
    </template>
</suspense>
```

10. Composition API

    reactive：创建一个具有响应式的对象

    ref：创建一个具有响应式的值类型数据

    readonly

    watch和watchEffect

    setup：代表了breforeCreate和created生命周期，也是composition API的入口函数

    生命周期钩子函数

11. 生命周期
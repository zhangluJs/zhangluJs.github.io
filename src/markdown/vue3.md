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

* Composition API生命周期。和vue2也差不多一样，只是需要在setup生命周期中调用

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

- **合成函数返回响应式对象时，尽量使用ref或者toRefs。这样有助于解构使用。**

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

### Vue3如何实现响应式

> Vue2.x的实现是通过Object.defineProPerty()，Vue3则是通过Proxy。

    Object.defineProperty缺点：深度监听需要一次性递归，data属性嵌套越多，就需要更多递归。无法监听删除/新增属性。无法监听原生数组，需要特殊处理（重写一遍原生数组方法）。

* Proxy

    Proxy接受两个参数，第一个参数是要代理的数据（对象or数组），第二个参数是一个对象（handle)，通过这个handle来完成对代理对象属性的监听。返回一个proxy对象。看下面代码。Reflect后面再说。

更新。又把Proxy和Reflect看了一遍，之前有点混淆了。Proxy handle里的set、deleteProperty并不能修改目标对象，而是目标对象被修改时可以被监听到，真正起到修改作用的是Reflect。proxy只是通过set、deleteProperty等handle通知是否操作成功。看developer.mozilla上解释说，Reflect和Proxy handle methods的命名相同，而且也有地方说他俩就是成对出现的，我就暂时理解为这俩绑定使用。

```js
let data = {a: 1, b: 2};
let proxyData = new Proxy(data, {
    get(target, key, receiver) {
        let ownKeys = Reflect.ownKeys(target);
        // 只处理原型上的属性
        if (ownKeys.includes(key)) {
            // do something
        }
        let result = Reflect.get(target, key, receiver);
        return result; // 返回属性值
    }
    set(target, key, value, receiver) {
        // 重复的值不做处理
        if (val === target[key]) {
            return true
        }
        let result = Reflect.set(target, key, value, receiver);
        return result; // 是否设置成功 true false
    }
    deleteProperty(target, key) {
        let result = Reflect.delateProperty(target, key);
        return result; // 是否删除成功 true false
    }
})
```

* Reflect

和 proxy能力一一对应，参数api都是对应。规范化、标准化、函数式。替代掉Object上的工具函数。

> Reflect的出现是为了让js更加规范，其实Reflect的很多方法js中是有的，比如判断某个属性是否来自某个对象可以in关键字。Reflect上则对应有has静态方法。两者完全等价。

```js
let obj = {a: 1};
'a' in obj;
Reflect.has(obj, 'a');
delete obj.a;
Reflect.deleteProperty(obj, 'a');
```

* Proxy如何实现响应式

> Vue2.x的响应式是深度递归（一次性获取所有属性）。Vue3是get的时候触发递归（什么时候访问什么时候触发）

```js
function reactive(target) {
    if (typeof target !== 'object' || target == null) {
        return target;
    }
    let handle = {
        get(target, key, receiver) {
            let ownKeys = Reflect.ownKeys(target);
            if (ownKeys.includes(key)) {
                console.log('get', key);
            }
            let result = Reflect.get(target, key, receiver);
            // return result;
            return reactive(result); // 深度监听。没有访问不触发
        },
        set(target, key, val, receiver) {
            if (val === target[key]) {
                return true;
            }

            let ownKeys = Reflect.ownKeys(target);
            if (ownKeys.includes(key)) {
                // 已有的属性
            } else {
                // 新增的属性
            }

            let result = Reflect.set(target, key, val, receiver);
            return result;
        }
        deleteProperty(target, key, receiver) {
            let result = Reflect.deleteProperty(target, key, receiver);
            return result;
        }
    }
    let observe = new Proxy(target, handle);
    return observe;
}
let obj = {
    a: 1,
    b: 'str',
    info: {
        city: 'beijing'
    }
}
const proxyData = reactive(obj);
```

Proxy实现响应式的优点

- 深度监听，性能更好（不用一次性递归完成）

- 可监听新增/删除属性

- 可监听数组变化

### 组件中v-model的使用方法

> vue3中移除了.sync。这个修饰符我从来都没用过。看vue3 v-model的时候，才发现有这么个东西。而且感觉.sync的写法其实并不是那么的好，虽然语法上简写了，但是可读性上并没有那么的直观。反观vue3的v-model很直观的看上去就知道是父子组件直接的双向数据绑定。

    父级只需要指定v-model:dataName="dataName"即可。

    子组件可以理解为$emit事件触发了一个叫update:dataName的事件，并且将value传递给了父组件。

```js
// 父
<child v-model:name="name" v-model:age="age">
setup() {
    let state = reactive({
        name: 'zhangsan',
        age: 20
    })
}
// 子
<input type="text" :value="name" @input="$emit('update:name', $event.target.value)" />
<input type="text" :value="age" @input="$emit('update:age', $event.target.value)" />
props: {
    name: String,
    age: String
}
```

### Computed

接收一个参数作为参数，返回一个`不变的`具有响应式的ref对象

```js
setup() {
    let count = ref(0);
    let plusOne = computed(() => {
        return count.value + 1;
    })
    console.log(plusOne.value); // 1 
}
```

或者，它也可以使用具有get和set函数的对象来创建可写的ref对象
```js
setup() {
    let count = ref(0);
    let plusOne = computed({
        get: () => {
            return count.value + 1;
        },
        set: val => {
            count.value = val - 1;
        }
    })
    plueOne.value = 1;
    console.log(count.value) // 0
}
```

### watch 与 watchEffect

* watch监听与vue2中的watch功能一样。它接收三个参数

    1: 第一个参数是一个ref或者是一个return reactive data的函数；

    2. 第二个参数是一个函数，它用于被监听data改变时的回调函数；

    3. 第三个可选参数是一个对象，它有immediate（组件初始化时触发一次），deep（深度监听）

```js
setup() {
    const name = ref('zhangsan');
    // 监听一个ref
    watch(name, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    }, {
        // 组件初始化时触发一次
        immediate: true,
        // 深度监听
        deep: true
    });
    const state = reactive({
        name: 'zhangsan'
    });
    // 监听一个reactive
    watch(() => state.name, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    })
}
```

* watchEffect

    watchEffect接收一个函数作为参数，它在组件初始化时会自动的触发一次。之后当其内部使用的响应式数据发生变化时都会触发。

```js
setup() {
    const state = reactive({
        name: 'zhangsan'
    });
    const age = ref(20);
    // watchEffect会触发三次，第一次初始化时自动调用，第二次state.name的修改。第三次age.value的修改
    watchEffect(() => {
        // state.name 与 age的修改都会触发watchEffect
        cosnole.log('this is watchEffect', state.name);
        console.log(age);
    });
    setTimeout(() => {
        state.name = 'lisi';
    }, 3000);
    setTimeout(() => {
        age.value = 25;
    }, 6000);
}
```

### 获取当前组件实例

    Vue3的composition API中是没有this的，如果查看this，返回的是undeifned，而vue2.x中this则指向了当前组件的实例。Vue3提供了getCurrentInstance()方法，这个方法返回当前组件的实例。需要注意的是getCurrentInstance只能在setup或生命周期钩子中调用。


## Vue3为何比Vue2快？

* proxy响应式

    深度监听，性能更好（不用一次性递归完成）

    可监听新增/删除属性

    可监听数组变化
    
* patchFlag

> patchFlag给每个节点打上标记，用于区分不同类类型的节点。比如静态、动态节点，动态节点又有哪些类型（prop、class、text...）。可以简单理解为如果当前节点是个静态节点（值或属性没有引用任何变量），就不去做比较如下图。通过改变传入的vnode，达到了优化diff算法的目的。

    编译模版时，动态节点做标记。

    标记分为不同的类型，如 TEXT PROPS CLASS

    diff算法时，可以区分静态节点，以及不同类型的动态节点。

![file type](./static/img/patchflag.jpg)

* hoistStatic

    将静态节点的定义提升到父作用域，缓存起来

    多个相邻的静态节点，会被合并

[可以在这里看一下模版编译后的样子](https://vue-next-template-explorer.netlify.app)

* cacheHandler

    缓存事件。将事件缓存起来

* SSR优化

    静态节点直接输入，绕过了vdom

    动态节点，还是需要动态渲染

* tree-shaking

    需要什么引入什么。import {} from 'vue';

### Vite？

> Vite是一个web构建工具，由于其原生ES模块导入方式，可以实现闪电般的冷服务启动（vite官网说的）。

* Vite是什么？

    Vite是一个前端打包工具，Vue作者发起的项目。

    优势：开发环境下无需打包，启动快

* 为什么启动非常快？

    开发环境使用ES6 Module，无需打包 -- 非常快。(动态引入（需要使用async await）、外链)

    生产环境使用rollup，并不会快很多。

```html
<!-- 指定type为module，就可以使用es6 module -->
<script type="module">
    import add from './src/add.js';
    console.log(add(1, 2));
</script>

<!-- 外链 -->
<script type="module" src="./src/test2.js"></script>
```

```js
// 动态引入注意要使用async await。add需要default，因为export的时候指定了default
document.getElementById('btn1').addEventListener('click', async () => {
    const add = await import('./src/add.js');
    console.log(add.default(10, 50));
});
```

### Composition API 与 React Hooks对比


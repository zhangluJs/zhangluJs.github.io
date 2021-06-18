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
# DOM事件处理

用户与浏览器进行某些交互，比如在页面上进行点击，hover等。浏览器根据用户的行为作出反应，这就可以称之为事件。

目前DOM事件可以分为DOM0级事件以及DOM2级事件。

DOM0级事件
```html
<h1 onclick="this.innerHTML='谢谢!'">请点击该文本</h1>
```
```js
<script>
    document.getElementById("myBtn").onclick=function(){displayDate()};
</script>
```

DOM2级事件
```js
document.getElementById('current').addEventListener('click', function (){
    // do something
}, false / true) // 冒泡 / 捕获
```

DOM2级事件通过addEventListener来绑定事件。在ie下是通过attchEvent绑定（总是不一样～）。

**它接受三个参数：**

1. 事件类型
2. 回调函数
3. true(捕获) / false(冒泡) 该参数可以省略。决定了是在冒泡阶段执行还是捕获阶段执行，默认false。

事件触发的顺序和第三个参数有些关系。会先触发捕获事件随后触发冒泡，不过一般情况下都是使用冒泡。(注意：如果你在目标元素上改变绑定事件的顺序，这些事件可能就不按照捕获和冒泡的顺序来了，而是根据捕获和冒泡的顺序进行触发，这个有解决方法,参考:[叶小钗的东东](http://www.cnblogs.com/yexiaochai/p/3567597.html))。


**事件对象event下的属性和方法：**

- currentTarget:     绑定事件的元素
- target:     具体触发事件的目标
- stopPropagation()     阻止冒泡或者捕获
- preventDefault()     阻止默认行为
- type:     事件的类型

...
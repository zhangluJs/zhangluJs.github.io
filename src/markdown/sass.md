# Sass预编译

几年前学习前端的时候就知道了预编译这个东西，当时还是用的一个叫考拉的应用来将sass或者less文件丢进去生成一个css文件然后来使用，后来随着node火起来，前端大部分项目开发都运行在node环境下，预编译也被集成了进去。方便了许多。最开始使用的时候因为类名层级嵌套写起来简单明了，所以后来的工作中就基本都在使用预编译了，接触多了知道还可以定义变量、方法、甚至自己的api。在反复写一些样式、或者在某些已有的类上拓展样式特别的便捷。[阮一峰老师关于sass的文章](http://www.ruanyifeng.com/blog/2012/06/sass.html)

这里主要以lu-design的样式来进行了解。在styles文件夹下。![file](./static/img/sass.png)

`index.scss`文件用来引入所有的scss文件，可以理解为一个主要的入口。

`_variables.scss`文件定义了组件库整体风格需要的主题色、产品色、边框、边距、字体风格样式等。语法是$变量名：属性值。关于!default我理解就是先给一个初始的默认值，如果重新被赋值的话则被取代。![variable](./static/img/variable.png)

`_reboot.scss`文件重新reset了浏览器默认的一些样式（[推荐一个专门reset浏览器默认样式的库](https://github.com/necolas/normalize.css)）

`_mixin.scss`文件定义了一些方法，通过传入不同的值（颜色、边距等）来对一个大的方向的样式进行调整，比如我这里就定义了btn的size与style传入不同值对应不同状态大小的btn，十分便捷。语法类似js的函数声明式小括号内是形参，函数体就是具体的样式。调用时需要@include mixinName()。括号内传入样式的值。
![mixin](./static/img/mixin.png) ![include](./static/img/include.png)

sass 内置颜色函数。lighten() 和 darken() 两个函数都是围绕颜色的亮度值做调整的，其中 lighten() 函数会让颜色变得更亮，与之相反的 darken() 函数会让颜色变得更暗。这个亮度值可以是 0~1 之间，不过常用的一般都在 3%~20% 之间。

还有一个小的点。sass文件如果不希望被编译为css可以在文件名前加_下划线。但是在@import时，不要写_下划线





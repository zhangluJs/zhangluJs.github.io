# CSS

### 定位

position属性指定一个元素的定位方法类型。

relative：相对定位。相对于其正常位置进行定位，定位后原本位置依然会被占用。偶尔看资料发现这个相对定位是在有margin或者其他对距离有影响的属性基础上在进行定位，后来理解这也确实是元素本身正确的位置。

absulote：绝对定位。相对于定位属性不为static的第一个父元素进行定位，如果向上查找一直没有的话则会相对于窗口定位。通常搭配relative来进行定位，可与margin属性叠加。

fixed：固定定位。相对于浏览器窗口定位。通常用来做一些提示框，或广告悬浮在页面右侧或其他位置。可与margin属性叠加。

sticky：粘性定位。元素在屏幕范围内时，行为与relative相似，而当元素滚出屏幕时，元素行为又与fixed相似。该属性并不会脱离文档流，仍然保留元素在文档流中的位置。这个玩意的用处很大，比如微信好友列表的字母引导定位。百度看这篇文章写的不错记录一下。参考:[杀了个回马枪，还是说说position:sticky吧](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/comment-page-2/#comment-406173)

### 距离单位

在开发中经常用到的长度单位有 px、%，如果值为0还可以省略单位，下面记录一下几种我常用的单位（其实写这个文章就是因为今天不知道怎么的看到rem上去了，才发现我竟然从来没有写过关于css的东西，赶紧补上）。

em：相对与当前元素的字体尺寸，不常用。默认1em = 16px；

rem：相对于根元素（html）的字体尺寸，默认1rem = 16px；rem在移动端应用的比较多，因为要相对于用户界面设置相对的元素大小。因为默认尺寸16px在单位换算时比较麻烦，通常都会给html的font-size：62.5%，即1rem = 10px；（公式：10 / 16 * 100%）

vh：相对于屏幕高度的单位，1vh = 视图高度的1%；

vw：相对于屏幕宽度的单位，1vw = 视图宽度的1%；

### 几种让元素在界面中消失的方法

display: none：元素彻底消失，不占空间，不渲染，能够引起页面重排，不会被子类继承，但是子类也不会显示

visibility: hidden：元素隐藏但是不会消失，依然占位，所以只会引起重绘。子类继承，但是子类可以通过设置visibility：visible达到展示效果。

opacity: 0；元素透明度100%，元素存在，只会引起重绘，会被元素继承，但是子元素并不能通过设置opacity：1来达到可见效果。

### 元素浮动

html元素中分块元素与行内元素，块元素独占一行。如果想让块元素在一行展示的话，需要设置float属性，包括left、right。添加了浮动属性后元素会被转换为块元素渲染，同时脱离正常的文档流。

元素添加了浮动属性后，会影响其他正常的元素。clear: both可以清除浮动，或者伪元素；宽高0，clear：both。

### BFC

块级格式化上下文是指一个独立的渲染区域，这个区域内的元素无论怎样都不会影响到区域外的元素。

第一次听到BFC这个概念的时候一脸懵逼，这是啥玩意为什么从来没听过，仔细看了之后发现，其实无意间已经在日常开发中运用好久了。[张鑫旭对 BFC 的描述（这哥们的文章真的是通俗易懂）](https://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)

形成：
1. overflow不为visivle的元素;
2. 元素具有定位属性（position：absolute\fixed）;
3. 内联块元素（display: inline-block）;
4. 浮动元素（float不为none）；

### 水平居中的方法

text-align: center 行内元素

margin: 0 auto; 宽度已知的块元素

display: flex; justify-content: center; 弹性盒属性自动居中

定位后：transform: translate(-50%, 0);

定位后：left\right\top\bottom 全部为0；margin: auto; 这个其实是水平垂直居中

### 垂直居中的方法

line-height: 容器高度相等 行内元素

定位后：transform: translate(0, -50%);

display: flex; align-items: centerl; 弹性盒属性

### 选择器

权重依次为

1. !important 选中最高

2. 行内 `<div style="xxxx:xxxx"></div> ` 1000

3. id选择器 100

4. class选择器 10

5. 元素选择器&关系选择器&伪元素选择器 1

6. 通配符 0

如果权重一样的话，后写的属性会覆盖之前的属性

### 盒模型

标准盒模型宽度： margin border padding content

怪异盒模型：margin content （IE）

box-sizing 切换盒模型 border-box(怪异盒模型)、content-box(标准盒模型)

在标准盒模型中，padding border 会被计算进width中，添加相应的宽度就要从width中减去相应的距离，而怪异盒模型则把这些全部计算在width中

### C3动画

为什么使用css来做动画，而尽量少使用js控制dom改变left、margin。查到的相关解释是，它在渲染过程中要比使用left、margin像素级的移动单位更小，使动画看上去更细腻，甚至可以利用GPU进行加速。并且最主要的一点使，它不会触发重排重绘，相对来说对页面性能影响较小。

animation：使用@keyframes 创建一个动画，其中可以定义from、to动画的起点以及终点的样式，还可以使用百分比来定义一些细节，两者搭配来进行使用。animation还有一些属性来定义动画进行过程中的速度、是否重复、播放时间等等。

transition：过渡某个属性到指定的样式。可以设置过渡的时间、速度曲线、过渡效果如何开始。

transform：该属性可以对元素进行缩放、变形、移动、旋转等操作。rotale、scale、translate等。

requestAnimationFrame：某一次面试中被问到这玩意了，问的我一脸懵逼，之前简单看过一眼知道也是做动画相关的东西，但是具体点就不行了（天天做后台管理系统，动画实在用不到）。这就记录一下吧。

1. CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，它依然在后台执行动画任务，由于此时页面处于不可见或隐藏状态，刷新动画没有意义，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处于未激活的状态下时，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，节省了CPU开销。

2. 定时器在完成动画时容易出现卡顿、掉帧的现象。原因是：1. setTimeout任务被放入异步队列中，主线任务完成后才会执行，因此实际执行的时间比定义的要晚。2. 定时器刷新的频率与屏幕刷新时间不一致，会引起丢帧。

3. requestAnimationFrame：由系统决定回调函数的执行时机，60Hz的刷新频率，那么每次刷新的间隔都会执行一次回调函数，不会引起丢帧、不会卡顿
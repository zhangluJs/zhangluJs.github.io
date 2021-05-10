# lu-design 开发记录笔记

最近工作上的项目不是特别的忙，ts、react-hooks等等新东西又火的一塌糊涂，项目中又没有接触。所以就干脆实践一下做个组件库项目来玩玩。这里主要记录项目从零到发布的整个过程，包括开发思路难点、遇到的坑、技术选型等等。这个组件库我起名叫做lu-design。它并不是一个很洋气的名字（其实抄袭了ant-deisgn的名字😰），而且不仅名字抄袭了，并且整个组件库的页面风格也大同小异。

### 完成一个组件库需要考虑的问题

- 代码结构

- 样式解决方案

- 组件需求分析和编码

- 组件测试用例分析和编码

- 代码打包输出和发布

### 文件结构&代码规范

- 文件结构有没有推荐或者强制的标准呢？答：没有。一般的主流文件结构有两种。第一种是按照功能或者路由来组织，第二种是按照文件类型。文件结构避免多层嵌套。[React官网给出了一些建议，可以供参考](https://react.docschina.org/docs/faq-structure.html)

 ![file type](./src/static/img/file1.png)![file type](./src/static/img/file2.png)

   这是我这次用的文件结构目录，主要是以组件为粒度来区分，styles中存放一些公共的样式。![file type](./src/static/img/file3.png)

- 代码规范还是遵循的ESlint。缩紧四个空格，=号两边带空格等

### style样式

首先要选择组件库的整体色彩方向（色谱），以一个设计师的角度来审视色彩。可以把系统分为两大体系，第一个为系统色板。有两种系统色板，一种是基础色板，一种是中性色板（黑白灰）。第二种为产品色板，产品色板有品牌色（可口可乐红、奥利奥蓝等），功能色板

- 系统色板：基础色板、中性色板（黑白灰）

- 产品色板：品牌色（可口可乐红、奥利奥蓝）、功能色（成功、失败、链接）

- 样式方面还是考虑使用最常用的Sass/Less。这里选择了sass。create-react-app不支持sass，先`npm install node-sass --save`下

字体系统：字体大小，字体风格、字体粗细等等

表单：input、button

边框&阴影

可配置开关：是否启动阴影、圆角、边框等

定义：`src/styles/_variable.scss` 定义一些基础的样式，基础色，产品色等。`src/styles/_reboot.scss`在normalize.css基础上重写了浏览器基础样式



## Button组件

今天（2020/12/23）做了第一个组件button。主要从按钮的类型、大小入手进行需求分析。按钮类型有primary、danger、default、link，按钮大小large、small。用刚学的ts中 interface 来对button组件的props进行一个属性的约束，主要涉及到的参数有size, btnType, href, children, disabled。通过对类型的判断来决定使用不同的className样式或者是button还是a标签。之前开发react项目的时候className都是手动判断然后写在jsx的节点上，特别的不美观。今天知道了一个第三方库[classnames](https://github.com/JedWatson/classnames)，他可以单独的将classname的逻辑抽离出来，生成一个对象，直接供dom节点使用。在关于整个组件库样式定义方面觉得需要着重关注一下sass预编译。虽然用了几年了但是从来没有深入了解过，所以专门开了篇md简单记录一下。



## 测试testing-library

这两天在看单元测试这个东西。其实工作之后听说过单元测试这类东西，但无论是在面试还是实际工作中都没有人问过关于单元测试的东西，自己对这玩意始终也是一头雾水。不懂一些功能单元测试怎么个测法。看了看教程之后才明白，他是通过方法来判断输入值与期望的返回值是否相等来进行判断代码逻辑是否有无问题。因为我这里用的react全家桶，他里面其实自带了`testing-library/jest-dom` `@testing-library/react` `@testing-library/user-event`这么几个包。

- testing-library是react官方推荐的测试库，在react-script3.3.0版本已经被添加成为默认的测试工具，它可以通过render方法将compnents渲染或者挂载到测试用例上去。

- jest应该算是最近比较火的一个通用测试框架（断言库）。jest-dom提供了针对dom的断言，更方便dom选择。

- user-event可以模拟用户触发事件。全家桶中还提供了test命令供使用，他会自动去执行项目中的`.test.tsx(js)`或`.spec.tsx(js)`或者`__tests__`文件夹下的.js文件。在终端中显示执行结果。

单元测试因为是第一次接触，虽然api用法比较容易上手，但感觉还是一知半解，需要慢慢深入了解。

`<!-- https://blog.csdn.net/weixin_26750481/article/details/108131405 -->`

## Menu组件

这两天（2020/12/28）在弄关于Menu组件相关的东西。组件本身开发起来的代码逻辑还好不是很复杂。个人觉得难点在于如何将初期的整个组件的思路捋顺。其实不只是这个组件，在工作或者学习时，动手初期应该仔细分析需求or实现的整个大的方向，顺着思路把细节打一个草稿出来(从什么方向入手、以什么方式实现、应该定义哪些参数/函数等等)，然后按照这个思路去实现，往往会比较顺利。比如这个Menu组件。他应该是什么格式的，是严格按照HTML节点那样调用，还是传入数据自己按照相应的规则渲染。组件都需要什么参数等等。最后看element、ant的组件库调用决定使用组件调用方式。因为相比较数据渲染实现，这种更接近HTML嵌套方式的调用方法，看上去更直观简洁明了一些，更符合语意化。

参数方面从设计图需求分析看：
- menu的类型：水平（horizontal） or 垂直（vertical）
- menu默认项：defaultIndex
- 回调函数：callback
  - menu-item禁用：disabled
  - menu-item高亮：avtive
  - menu-item点击回调：返回点击index
    - sub-menu-item：submenu只需要考虑title，但是有一个需要注意的点，就是在不同类型（水平、垂直）下子菜单的展示的触发方式，在horizontal应该是鼠标进入、离开触发。vertical则是点击触发。

```HTML
<Menu defaultIndex={0} onSelect={(i) => {alert(i)}}>
    <MenuItem index={0}>Link 0</MenuItem>
    <MenuItem index={1} disabled>Link 1</MenuItem>
    <MenuItem index={2}>Link 2</MenuItem>
    <SubMenu title={'11111'}>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
    </SubMenu>
    <MenuItem index={3}>Link 3</MenuItem>
    <MenuItem index={4}>Link 4</MenuItem>
</Menu>
```

2021/04/22 update。今天更新了Menu组件的属性部分。在使用的时候去掉了MenuItem上的index属性。改为使用`React.Children.map`api来对节点遍历的。遍历时使用（看下面01js，这里markdown编译报错）来动态的添加index属性。同时index属性改为了string类型，因为SubMenu下的MenuItem无法使用number。在SubMenu下的MenuItem下的index为2-0、2-1等，这样方便添加avtive状态。同时增加了defaultSubMenus（默认打开的某项），他接收一个数组作为参数，在SubMenu组件中，通过判断defaultSubMenus.includes(index)来判断是否默认打开。更新后的组件使用如下。

```js
`React.cloneElement(childElement, {index: index.toString()});`
```

2021/04/23 update。 昨天在更新文章的时候将上面的这行js代码写进了反引号里``，结果我运行项目时报错node_model缺包，起初我以为是我前不久重装了电脑系统导致环境缺失搞的，于是我装了8.+版本的node，又重新install，但是控制台还是报错。提示我Reactd的某个包缺失。前前后后折腾了两个小时才反映过来，两天前刚跑过这个项目，应该不是包的问题，于是我把上面这段js删除，果然跑起来。所以我就把它挪到下面了。个人估计应该是这段代码带了()被运行了。感觉和XSS攻击有异曲同工的地方，虽然工作以来没遇到过。记录一下这个小坑。

```HTML
<!-- 组件上的index属性可以不写，这里为了方便阅读 -->
<Menu defaultIndex="0" mode="vertical" defaultSubMenus={['1']}>
    <MenuItem index="0">Link 0</MenuItem>
    <MenuItem index="1" disabled>Link 1</MenuItem>
    <SubMenu index="2" title={'text'}>
        <MenuItem index="2-0">1</MenuItem>
        <MenuItem index="2-1">2</MenuItem>
    </SubMenu>
    <MenuItem index="3">Link 3</MenuItem>
    <MenuItem index="4">Link 4</MenuItem>
</Menu>
```
2021/04/26 update。 今天完善了一下menu的单元测试。相比较之前的两个组件的单元测试，这个稍微复杂了一些。`describe`中用到了`beforeEach`，它在用例执行的时候都会执行一遍，在这里我执行了渲染组件、挂载节点、获取不同节点的状态。
menu测试用例中需要重点讲一下的是`waitFor`。在水平menu中鼠标hover上后才会展示submenu里的item。而且这里用到了c3动画`transiton`来过渡显示/隐藏。当在显示后立刻判断节点上是否有对应的class名称时不会通过，因为这是一个异步的过程。这时候就用到了`waitFor`。可以简单理解为js中的 `async await`。
当我初次判断子组件是否隐藏时，用例无法通过。是因为没有样式的控制，它认为子item是隐藏的。所以这时候就需要在测试用例中写上对应class名称的样式来对它进行一个初始化的操作。通过`wrapper.container.append`来追加到当前挂载的节点上。

## Tabs组件

2021/04/29 update。 这两天在尝试着弄tabs组件。最开始以为大概和Menu组件差不多一个思路，头部的nav部分很快就好了，但是在下面的内容部分确有点绕不出来的感觉（也许是因为没睡好的原因吧）。
1. 最开始尝试将pane写进渲染li的TabItem组件里，用样式名来控制显示隐藏，但是发现，如果这样写进去的话样式控制起来不合理。比如由于写进了TabItem里。pane的宽度没法确定，如果定位脱离出来的话，宽度又没法确定。so放弃。
2. 另一种思路是直接在tabs里写div再次渲染TabItem，利用currentActive === passedContext.index比较，但是发现有点思路有点跑偏了。
3. 看了ant-deign的tab后发现它的nav与content是分开两个容器渲染的所以我又尝试在tabs中引入了tab-pane组件，但是这样好像也不太对，今天就先这样吧，需要上线的项目有点多，略忙。

```HTML
<Tabs defaultIndex={0} onSelect={(index) => {alert(index)}}>
    <TabItem label="card1">this is card one</TabItem>
    <TabItem label="card2">this is card two</TabItem>
    <TabItem label="disabled" disabled>this is card three</TabItem>
</Tabs>
```

2021/05/07 更新。今天算是磕磕巴巴把tabs组件弄出来了。之前的思路2其实是正确的，只不过被Menu组件给绕进去了（认为Tabs里的children是自己定义的，其实是tabitem）。认为item和pane都要全部渲染出来，然后通过index来对比展示与否。item确实和Menu一样遍历出来就行，获取label和disabled属性。而pane则直接拿`<TabItem>`的children渲染即可。

2021/05/10 更新。tabs组件完事了，写了一下单元测试。它的单元测试写起来感觉没有Menu那么复杂。主要是查找节点、title点击、disable状态的点击。我这里由于是index === activeIndex来渲染的content，所以不像MenuItem那样创建个style塞进去，然后判断节点显示正常与否。其实这里我看了element和ant-design它们两个都是通过display:none来控制content的。这样做的好处可能是减少dom节点重排吧，而且里面的节点如果有什么初始化的东西，不需要每次切换就重新挂载。它比我这里这种操作节点的方法要好了很多，后面我可以考虑要换一下这里的做法了。
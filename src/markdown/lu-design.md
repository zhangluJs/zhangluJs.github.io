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
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


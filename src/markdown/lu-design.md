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

 ![file type](./static/img/file1.png)![file type](./static/img/file2.png)

   这是我这次用的文件结构目录，主要是以组件为粒度来区分，styles中存放一些公共的样式。![file type](./static/img/file3.png)

- 代码规范还是遵循的ESlint。缩紧四个空格，=号两边带空格等

### style样式

首先要选择组件库的整体色彩方向（色谱），以一个设计师的角度来审视色彩。可以把系统分为两大体系，第一个为系统色板。有两种系统色板，一种是基础色板，一种是中性色板（黑白灰）。第二种为产品色板，产品色板有品牌色（可口可乐红、奥利奥蓝等），功能色板

- 系统色板：基础色板、中性色板（黑白灰）

- 产品色板：品牌色（可口可乐红、奥利奥蓝）、功能色（成功、失败、链接）

- 样式方面还是考虑使用最常用的scss/Less。这里选择了scss。create-react-app不支持scss，先`npm install node-sass --save`下

字体系统：字体大小，字体风格、字体粗细等等

表单：input、button

边框&阴影

可配置开关：是否启动阴影、圆角、边框等

定义：`src/styles/_variable.scss` 定义一些基础的样式，基础色，产品色等。`src/styles/_reboot.scss`在normalize.css基础上重写了浏览器基础样式



## Button组件

2020/12/23 更新。做了第一个组件button。主要从按钮的类型、大小入手进行需求分析。按钮类型有primary、danger、default、link，按钮大小large、small。用刚学的ts中 interface 来对button组件的props进行一个属性的约束，主要涉及到的参数有size, btnType, href, children, disabled。通过对类型的判断来决定使用不同的className样式或者是button还是a标签。之前开发react项目的时候className都是手动判断然后写在jsx的节点上，特别的不美观。今天知道了一个第三方库[classnames](https://github.com/JedWatson/classnames)，他可以单独的将classname的逻辑抽离出来，生成一个对象，直接供dom节点使用。在关于整个组件库样式定义方面觉得需要着重关注一下scss预编译。虽然用了几年了但是从来没有深入了解过，所以专门开了篇md简单记录一下。



## 测试testing-library

这两天在看单元测试这个东西。其实工作之后听说过单元测试这类东西，但无论是在面试还是实际工作中都没有人问过关于单元测试的东西，自己对这玩意始终也是一头雾水。不懂一些功能单元测试怎么个测法。看了看教程之后才明白，他是通过方法来判断输入值与期望的返回值是否相等来进行判断代码逻辑是否有无问题。因为我这里用的react全家桶，他里面其实自带了`testing-library/jest-dom` `@testing-library/react` `@testing-library/user-event`这么几个包。

- testing-library是react官方推荐的测试库，在react-script3.3.0版本已经被添加成为默认的测试工具，它可以通过render方法将compnents渲染或者挂载到测试用例上去。

- jest应该算是最近比较火的一个通用测试框架（断言库）。jest-dom提供了针对dom的断言，更方便dom选择。

- user-event可以模拟用户触发事件。全家桶中还提供了test命令供使用，他会自动去执行项目中的`.test.tsx(js)`或`.spec.tsx(js)`或者`__tests__`文件夹下的.js文件。在终端中显示执行结果。

单元测试因为是第一次接触，虽然api用法比较容易上手，但感觉还是一知半解，需要慢慢深入了解。

`<!-- https://blog.csdn.net/weixin_26750481/article/details/108131405 -->`

## Menu组件

2020/12/28 更新。在弄关于Menu组件相关的东西。组件本身开发起来的代码逻辑还好不是很复杂。个人觉得难点在于如何将初期的整个组件的思路捋顺。其实不只是这个组件，在工作或者学习时，动手初期应该仔细分析需求or实现的整个大的方向，顺着思路把细节打一个草稿出来(从什么方向入手、以什么方式实现、应该定义哪些参数/函数等等)，然后按照这个思路去实现，往往会比较顺利。比如这个Menu组件。他应该是什么格式的，是严格按照HTML节点那样调用，还是传入数据自己按照相应的规则渲染。组件都需要什么参数等等。最后看element、ant的组件库调用决定使用组件调用方式。因为相比较数据渲染实现，这种更接近HTML嵌套方式的调用方法，看上去更直观简洁明了一些，更符合语意化。

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

```HTML
<CSSTransition
    in={menuOpen}
    timeout={300}
    classNames="zoom-in-top"
    appear>
    <ul className={subMenuClass}>
        {childrenComponent}
    </ul>
</CSSTransition>
```

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

## Icon组件

2021/05/10 更新。添加了icon组件。这个组件是在`fontawesome/react-fontawesome`基础上又封装了一层。`fontawesome/react-fontawesome`字体图标库使用的是svg。svg相较于直接插入一个img来说要好很多了，首先加载方面要快的多不需要发送网络请求。svg是矢量图形，任意放大缩小图片质量都不会下降。在工作中的项目里也经常使用字体图标，很熟悉的阿里的icon-font，提供定制化的图标选择，选择完成后生成一份本地文件，就可以直接在css通过类名进行引用。

`fontawesome`使用起来也很方便，从`@fortawesome/react-fontawesome`中结构出`FontAwesomeIcon`，就可以直接拿来当做标签使用。使用`fontawesome-svg-core`library.add`free-solid-svg-icons`中的fas来把它所有图标添加进来。

这次封装因为添加了主题颜色theme-color，所以直接在_variables.scss定义了$theme-colors Map。使用scss语法@each进行遍历，生成了多个class样式（说来惭愧，这是我第一次用scss中的遍历，虽然scss已经用了好些年了）。

```js
/** 
 * 核心 根本库
*/
import {library} from '@fortawesome/fontawesome-svg-core';

/** 
 * react fontawesome 组件
*/
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

/** 
 * 安装的icon类型（还有许多其他类型）
 * fas 添加所有图标
*/
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);
```

```HTML
<!-- FontAwesomeIcon使用方法 很简单 还支持很多属性 动画 旋转什么的 --->
<FontAwesomeIcon icon={faCoffee} size="2x"></FontAwesomeIcon>

<!-- 封装后的使用方法，只是在原组件的基础上拓展了theme -->
<Icon icon={'apple-alt'} size="1x" theme="primary" ></Icon>
```

## Transition

2021/05/11 更新。完善了submenu的展开/收起动画。如果单纯的在节点上通过opacity:0～1来控制显隐，通过transition过渡不会生效，因为display：none/block不支持过渡属性，其他动画就会失效。但是如果去掉display：none/block的话，节点确实是隐藏掉了，但是它依然是占位的。如果opacity和display同时生效的话就可以覆盖这个场景。[react刚好提供了这样的东西](https://zh-hans.reactjs.org/docs/faq-styling.html#how-do-i-add-css-classes-to-components)。这次用的是`react-transition-group`。使用CSSTransition标签包裹，定义in/timeout/className属性就可以达到预期的效果[API](http://reactcommunity.org/react-transition-group/transition)。

创建了Transition组件，其实就是把CSSTransition拿了出来，在进行一次包裹。在Transition里定义了不同的AnimationName，以及把CSS的样式抽离出来定义到mixin中。提供了不同方法的一些过渡。

## Alert

2021/05/12 更新。 补充一下Alert组件的描述。这个组件是最开始就有的，但是忘记写了。功能很简单，提示一个标题，和展示的内容。有不同的主题包括警告、提示、成功等。今天将Icon和Transition组件添加进了Alert组件里。将右上角的关闭替换成了Icon，关闭的时候添加了动画效果。

```HTML
<Alert
    type={AlertType.Warning}
    title="这是一个alert组件标题">
    this is a warning
</Alert>
```

## StoryBook

2021/05/12 更新。 组件已经开发了几个了，在调试运行的时候都是在App.tsx里运行，每次添加不同的组件、属性查看效果，非常的不直观。期望和其他组件库的api一样有书签什么的，属性查看相关的功能，所以就拿来用storybook了。而且最主要的一点是它可以用来当作组件文档，就想ant-deisgn/element-ui官网那样的文档，有组件展示，源代码示例等。这玩意好像还挺火，github上的star数有几十k，但是之前一直都没听过（有点闭塞了）。刚好趁这个机会试试它。

首先 `npx -p @storybook/cli sb init` 。完成之后会在项目中生成如下目录，package.json中也会增加新的script命令。按照给出的示例，我将alert组件添加进去，在页面的目录中就出现了相对应的组件描述，很简单的配置规则，一目了然。

- .storybook // 这是关于stroybook相关的配置
    - main.js
    - preview.js
- src
    - stories // 这个目录下面是相关的示例

storybook中有很多addon，它可以额外的扩展一些功能，隐约能感觉到它的功能很多，但是文档是英文的，而且也没仔细看。慢慢来...

2021/05/13 更新。Storybook插件系统。[addons](https://storybook.js.org/addons)，它分为两大类。目前已经提供了很多的addon了，我理解你需要某个addon就引入然后注册使用即可。
    
    一种是Decorators（装饰器）。它其实是一个funciton，最终返回的是其他节点包裹我们要展示的组件，这样就可以改变节点的外观和行为。在LuDesign/.storybook/preview.js中addDecorator了一些样式。

    另一种是Native Addons。它除了改变显示组件本身以外，还能做更多的事。

    还有关于add、addParameters是storiesOf的一些配置，支持链式调用。可以参考LuDesign/src/components/Button/Button.stories.tsx文件

关于storybook文档的生成目前有两种方法，在*.stories.tsx文件一种是(storybook方法1)一种是(storybook方法2)。方法1是init后storybook中example中给出的示例，但是在Menu中嵌套MenuItem按照方法1我就不知道怎么写了，所以就用了方法2。方法1是storybook^6.+中的写法，方法2是5.+的写法新版本也兼容。但是我感觉方法1是可以写出来的。哎～。

```js
// storybook方法1
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Alert, {AlertType, close, AlertProps} from './Alert';
export default {
    type: AlertType.Default,
    title: 'Alert',
    showClose: close.Show
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args} />;
export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
    type: AlertType.Default,
    title: '默认的提示',
    showClose: close.Show,
    children: '默认的提示内容'
};

// storybook方法2
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Tabs from './Tabs';
import TabItem from './TabItem';
import Icon from '../Icon/index';
const defaultTabs = () => (
    <Tabs onSelect={action('selected')}>
        <TabItem label="选项卡一">this is content one</TabItem>
        <TabItem label="用户管理">this is content three</TabItem>
    </Tabs>
)

const cardTabs = () => (
    <Tabs onSelect={action('selected')} type="card">
        <TabItem label='card1'>this is card one</TabItem>
        <TabItem label="disabled" disabled>this is content three</TabItem>
    </Tabs> 
)
storiesOf('Tabs', module)
  .add('Tabs', defaultTabs)
  .add('选项卡样式的Tabs', cardTabs)
```

#### react-docgen

文档生成器，在StoryBook中已经自带了react-docgen，但是lu-design是typescript，所以需要额外的react-docgen-typescript-loader来让它工作。ps：在新版的storybook中已经不要这个了，它内置了addon-docs。


## Input

2021/05/14 更新。 添加了Input组件，它和ant-design、element-ui的input组件一样，支持前后后缀的添加、支持添加icon。在实现的过程中，我给input绑定了onChange事件，并且把value return出来当作一个回调函数供外部使用，但是看了别人的例子后发现，根本不需要这样做。直接在Input组件上绑定onChange事件就可以，这是为什么呢？因为在实现中已经把所有的 props下的...restProps全部给了组件里的input框，也就是说其实组件上的onChange事件是直接作用在input元素上的。需要考虑的就是在interface onChange事件规定类型的时候需要`onChange?: (e: ChangeEvent<HTMLInputElement>) => void;`。将参数类型固定，否则外部e.target属性下没有value。还有一个需要注意的点就是在interface InputProps extends InputHTMLAttributes 在继承的时候需要Omit来忽略一下size属性。因为组件本身有size属性，而react上的input也有size属性，需要将它忽略掉，就需要用到Omit `interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {}`

## AutoComplete 

2021/05/17 更新。 添加了AutoComplete组件，它在Input基础上增加。在Input onChange的时候自己定义过滤数据的规则。并且通过组件内的方法`fetchSuggestions`来接收处理完的数组，它接收一个用户在Input框输入的字符串，并且返回一个符合过滤条件的DataSourceType数组。这个字符串数组用来渲染联想后的list。这里用ul li来渲染这个list，同时list上定义了onSelect方法，在点击后获取target的value，并作为input的value。需要注意的一点是，这里需用复杂类型来约束数据的类型，需要传入带有value的object。定义了新的组件方法`renderOption`，它允许用户传入自定义的list渲染规则，接收DataSourceType类型的参数，返回一段ReactElemenet。

```js
/**
 * 因为有可能接收更复杂的数据类型，不能item只是一个string
 * 所以需要将一开始定义的string类型全部更换为复杂的类型（object）
 * 
 */
interface DataSuorctObject {
    value: string
}

// 复杂类型
export type DataSourceType<T = {}> = T & DataSuorctObject;
```






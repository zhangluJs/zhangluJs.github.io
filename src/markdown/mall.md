# 购物商城开发笔记

**技术选型**

- ```前端部分```： 使用自己已经用的很熟练的vue-cli来构建。因为做这个购物商城项目的目的并不是来学习前端。而是对后端知识进行一个拓展，所以前端这块就用自己熟悉的框架来节省开发时间。

- ```服务端部分```： 使用基于node.js的一个web框架express来进行开发，因为是js语法对自己比较友好，并且考虑到时间并不是很充裕，所以选择了express。

- ```数据库```： 使用MongoDB。它是以json数据格式来进行存储的，结构灵活、成本较低。对node.js以及前端来做数据交互时相当友好。

**开发环境**

-  ```VSCode```： 日常开发vscode编辑器为主，submlime为辅。所以编辑器就是这两个了，而且我的VSCode也装了许多插件来配合开发。

- ```iTerm```： 使用iTerm命令行工具，周围同事都用这个，我也被安利了。

- ```pm2```： 使用pm2进程管理工具。这个是后面遇到部署方面的问题时的解决方案，一开始并不知道有这么好用的东西，算是一个小收获。之后会介绍pm2。

- ```chrome```： 这个没什么好说的，前端必备。

- ```Git```： 程序猿必备。

### 前端部分

**目录分析**

vue-cli 构建SPA单页应用

1. 直接通过命令```vue init webpack mall-demo```（默认已经安装node/npm/vue-cli）来自动生成一个基于webpack构建工具的vue项目（这里还有其他的工具可以选择，不是重点，就不介绍了）。

2. npm install/yarn install，下载项目依赖的一些包。

3. 对cli生成的前端项目文件进行一个简单的概述

![vue-demo-fe](./static/img/vue-demo-fe1.png)

- build文件夹下主要是webpack的配置文件。里面有一些loader、版本检测、代码高亮等。这里的webpack配置还区分了开发环境与生产环境。

- config主要是来配置环境变量，用于区分开发或生产环境。来对webpack运行时做不同的处理。

- node_modules存放该项目所依赖的工具包

- src存放开发的一些源代码。assets存放静态文件（css模块化）、components存放一些公用组件（header，footer等）、router存放页面定义路由、util放一些定义的公共方法、pages/views放页面视图、vuex管理集中使用的一些状态、app.vue整个项目根router-view、main.js整个项目的入口文件。

- package.json项目的信息，时间、作者、描述、版本、依赖包等

- README.md项目情况的描述

- .babelrc babel的配置文件，babel用来转义es6/es7语法为浏览器可识别的es5

- .gitignore在git提交时忽略的某些文件

**页面概览**

![vue-demo-fe](./static/img/vue-demo-pageall.png)

该购物商城项目一共有6个页面。分为，首页、购物车列表页面、地址选择页、填写地址页、订单确认页、订单完成页。

页面布局。通用的header、nav、footer。main部分由子路由页面构成。

1. 首页：首页有商品列表、价格筛选、降序升序、上拉加载、加入到购物车并同步头部购物车内商品数量等功能。

2. 购车列表页：列出了该用户下购物车中的商品以及数量。增加减少商品数量、同步头部购物车内商品数量、删除商品、计算总价、总价添加千分符等功能。

3. 收货地址：默认选中、手动选中等功能。

4. 新增收货地址页：一个简单的表单填写，提交、返回等功能。

5. 订单确认

6. 订单完成（没有付款功能）

**技术模块**

- 网络请求：这里使用的是axios。axios是居于promise封装的一个HTTP库，语法简洁，可以运行在浏览器与node.js中。这个也是目前工作中最常使用的网络请求库。关于api就不过多描述了。我在使用axios时，都是将它绑定在vue的prototype上来使用。
```js
// main.js
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$http = axios;
// template
this.$http.get('/goods/list', {
    params
}).then(res => {
    //codeing...
})
```

- 图片懒加载：由于img加载需要时间，未加载完成的img带来的用户体验不是很好，所以使用vue-lazyload来对img设置一个初始化的样式，提高用户体验。入口main.js中引入，并注入到vue中，指定laoding时的默认样式，然后在需要懒加载的图片绑定 v-bind:src 修改为 v-lazy 
```js
// main.js
import VueLazyLoad from 'vue-lazyload';

Vue.use(VueLazyLoad, {
    loading: '../static/loading/loading-bars.svg'
});
// template
<img v-lazy="src" alt="">
```

- 上拉加载：在首屏加载时，不易过多的加载太庞大的数据，否则数据还未返回时或者在渲染时页面中会有一块空白的区域，造成的用户体验很差。分批加载数据，可以避免这一问题。将v-infinite-scroll元素放置在需要上拉加载的元素底部，当页面滚动到该元素位置上时，将触发v-infinite-scroll定义的方法。
```js
// main.js
import Vue from 'vue';
Vue.use(infiniteScroll);

//template
<div
    style="text-align:center"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="20">
    <img v-if="loading" src="../../static/loading/loading-spinning-bubbles.svg">
</div>
```

- vuex：项目中购物车内商品数量需要在多个组件中同步，所以用到状态管理器vuex。vuex中的内容非常多，这里只是对该项目中的运用进行一个简单的描述
```js
// 定义store
const store = new Vuex.Store({
    state: {
        cartCount: 0
    },
    mutations: {
        initcartCount(state, num) {
            state.cartCount = num;
        },
        updateCartCount(state, num) {
            state.cartCount += num;
        }
    }
});

// 在实例中注入
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});

// template 获取cartCount
computed: {
    cartNum() {
        return this.$store.state.cartCount;
    }
}
// template 修改状态
this.$store.commit('initcartCount', res.result.cartNum);
```
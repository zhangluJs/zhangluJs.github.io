# react-project
使用webpack构建工具，配合react来做一个个人项目。主要是用来学习


## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build

```


* 2018/09/10
    * 主要对配置文件进行了调整。由于不小心使用了webpack4，也就是最新版（原谅我的单纯,install时的洒脱），趟了许多坑。比如在将css样式抽离一个文件出来的时候，之前webpack支持的extract-webpack-plugin已经被启用了，查了好多资料才发现现在使用的是mini-css-extract-plugin，并且写法上也有些不同，虽然以前没有配置过。在配置babel这个loader的时候，由于babel版本与webpack版本不兼容，又是查了许多资料后才发现是babel版本太高了，将babel-loader从8.0.2降至7.1.4、将babel-preset-env从1.7降至1.6.1问题迎刃而解。在使用某个工具的时候尽量使用成熟稳定的版本，避免使用beta版本，避免当小白鼠。

* 2018/9/11
    * 今天在项目中把react-router-dom加了进来，目前对router有了一些基本的认识。不过貌似又是使用了最新的版本（V4,还好不是beta版本）。在使用过程中发现目前这个版本的react路由与vue的路由思想相差很大，以至于刚开始看的时候怎么都看不明白，本着能动手尽量憋吵吵的原则敲了一遍代码发现实际用起来还是蛮容易上手的。只不过link与子路由容器一起写在一个组件里有些不太适应，我试图将<link>与<route>拆开分别写在两个组件中（父子关系）发现不会生效，不知道是不是自己语法问题。看相关资料貌似之前的 v3,v2版本和vue一样，也是可以将路由配置单独定义出来的，不过目前v4的这种定义方法显的更灵活一些。里面还有很多的api今天只是大概扫了一眼，之后等正式开发的时候在仔细揣摩。最后给自己的一个不太好的建议，webpack之后尽量用官网配置好的吧，自己配置坑太多。而且由于自己视野的问题，开发环境与测试环境的不同，可能还需要学习扫盲。偶尔来配置一下学习一下还是有必要的，但是在实际工作中还是要慎重自己配置

* 2018/9/12
    * 今天主要把大框架搭出来了，在过程中被map方法遍历组件这块绕的有点晕，和vue的template不太一样，它貌似不支持嵌套，只支持平行的赋值操作，然后渲染那个变量。不过react和vue一样，一定要有key属性来作为唯一标示，否则渲染就会出现错误。还有一个问题就是，昨天说的link与route不能分开写的那个问题，貌似是我弄错了，今天查资料发现其实是可以分开的，昨天可能是因为自己写的问题吧，误以为是不可以这样做的。总之react-router-dom里面的api还需要好好熟悉一下，还是太生疏。今天就先这样吧

* 2018/9/13
    * 今天有点小忙，抽空看了看react里的表单数据修改，还没看完。emmm...

* 2018/9/14
    * 把表单部分看了个大概，发现react中的表单，如单选、复选与原生的思路差不多，本以为在诸如此类框架中会简便一些，比如在vue中。结果使用下来发现这部分并没有vue中的简便。就是因为react与vue核心数据绑定的设计思路不同最终导致的这些差异。不过还好，看了看也很容易明白。最后又把element-ui引了进来，觉得没有ui图，还是找一个现成的ui库做出来的页面会比较好看吧。刚开始引进来报了一堆错，才发现是自己的webpack没有配置解析.css\.ttf\.woff后缀文件的loader，看来webpack以后还是要多配置配置，不过整体还算顺利。

* 2018/10/12
    * 今天不是很忙，研究了一天react-redux。还是很晕，不知道是不是思想和vuex不一样的原因，反正感觉不像vuex那样通俗易懂。vuex的思想就是一个集中式的状态管理器，下面许多组件需要依赖的某些值就一起放在store中，对store中的这个值进行修改，就会分发到各个使用了该值的组件中。redux还得好好研究一下。

* 2018/12/27
    * 这一个多月折腾的vue个人项目终于上线了，是自己第一个个人上线的项目，还是很开心的。不过目前有一些小瑕疵，但是我已经很满足了。访问[地址](http://zhangluupup.top:3000/#/)。  现在折腾一下这个react项目，昨天刚把webpack配置项改好，虽然很简单，但是dev、build都已经没问题了:+1:。
    ![vue-demo](./src/static/vue-demo-index.png)
    ![vue-demo](./src/static/vue-demo-cart.png)
    ![vue-demo](./src/static/vue-demo-address.png)
    ![vue-demo](./src/static/vue-demo-addnewaddress.png)
    ![vue-demo](./src/static/vue-demo-orderconfirm.png)
    ![vue-demo](./src/static/vue-demo-ordersuccess.png)
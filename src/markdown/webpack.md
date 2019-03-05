# webpack

**首先来看一下[webpack](https://www.webpackjs.com/)官网给出的一个示意图**

![webpack](./static/img/webpack.png)

其实仔细的看看官网这个图片就发现基本上已经把webpack给总结出来了。一个一个相互独立却又关联的模块（js、img、sass）通过webpack被打包构建成为了一个个整体。这对我们开发者来说是一种解放。还记得很久以前学习前端，不知道有构建工具，一个inde.html，若干个css、js文件就开始敲代码（小白的时候），页面一多起来就会发现随之而来的是css与js的臃肿，无意中给开发以及日后维护带来了很大的痛苦。后来使用这种构建工具，它将我们的一个一个模块独立拆分出来，各个模块之间独立，只需要关注模块内部的东西，化繁为简。大大提高了工作效率，维护成本。

### 开始学习

1. 创建文件夹。在文件夹下执行命令 ```npm init```（默认已经安装npm、node、vscode、chrome等），来初始化package.json文件。这个文件里描述了你项目中的用到的一些开发依赖项，以及项目入口执行脚本、版本，作者等等一系列关于该项目的信息。

2. ```npm install webpack webpack-cli --save-dev```， install webpack 相关的包才可以来使用webpack进行后续的开发配置等等。 --save-dev的作用是开发时需要依赖的包，会将包信息添加到package.json中devDependencies。因为webpack是在开发时候需要的工具，而打包完成上线并不需要webpack所以我们将它保存在开发环境依赖中。

3. 创建index.htlm文件。创建src文件夹，来存放具体的页面组件相关内容。创建webpack.config.js文件（使用webpack命令的情况下，webpack会默认在项目目录下寻找webpack.config.js文件，把它作为默认的入口文件来运行）。我这里手动将webpack的启动与构建命令写入了package.json的script中。这样通过简易的```npm run dev```与```npm run build```命令就可以完成启动与构建。

**webpack具体相关配置项**

#### entry：

项目的入口。有三种类型的值可以选择，一种是string，也就是指定一个具体的入口文件。第二种是数组，指定多个入口文件。第三种是对象：对象的key代表chunkName,value就是一个真实的entry（在多页面应用时会用到第三种方式）。要注意的是，以对象为入口时output中filename也要相应的做出调整，可以用这三种占位符来表达你输出的文件名称[name]/[hash]/[chunkhash]。如果依旧只指定一个出口文件名称的，打包出的结果会被覆盖掉。

```js
entry: path.join(__dirname, 'src/main.js')
```

#### output：

文件打包出口。值为对象，其中常用的属性有 filename、path。

```js
output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/main.[hash].js'
}
```

#### devtool：

使用构建工具后，项目一旦报错就很难找出具体问题所在，webpack提供了devtool来帮助我们解决这个问题（开发中遇到了这个问题才添加到配置中）。

#### devServer：

webpack-dev-server是一个小型的Node.js Express服务器。通过它我们可以在本地快速启动项目开发等。

```js
devServer: {
    contentBase: './',
    inline: true,
    port: 8080,
    compress: false,
    hot: true
}
```

#### loader：

对加载的文件资源进行转换。比如对图片进行压缩，es6/es7转为浏览器识别的es5，编译less、sass等。我在这个项目中打算使用reacr所以需要对jsx来进行编译。在使用各种laoder的时候别忘了提前install。关于各个loader就不介绍了，基本上官网就已经给出很好的解释了。
```js
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(jpg|jpeg|gif|png|svg)$/,
            loader: 'url-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }
        // ...
    ]
}
```

#### plugins：

对于这个选项官网给出的解释是```用于以各种方式自定义 webpack 构建过程```。
```js
plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: 'body'
    })
    // ...
}
```

**马后炮一发。其实整体配置完了后发现，配置项并没有多复杂，按照自己的需要选择不同的loader、plugin来满足项目的需要。当然了，vue-cli那种复杂并且区分开发环境生产环境的架子一时半会还是搞不定的，还需要慢慢学习、经历与沉淀。**
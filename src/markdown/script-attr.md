### script标签的defer与async的区别

在页面中把外部脚本插入到html中需要用到\<script\>元素，该元素有两个属性defer（延迟脚本）/async（异步脚本）。

```
defer属性是表明，在脚本加载过程中不会影响页面构造。也就是说，脚本会被延迟到整个文档加载完毕后执行。
浏览器渲染页面，在遇到有defer属性的script标签，不会停止dom的渲染，而是异步下载，并且在整个页面内容加载完毕后才会开始执行这个脚本。
有多个defer属性的script标签时，会按照顺序执行。
```

```
async是浏览器立即异步下载脚本，不同于defer的是，下载完毕后会立即执行，此时会阻塞dom渲染，所以async的script最好不要操作dom。
因为是下载完立即执行，不能保证执行顺序。
```

![webpack](./static/img/async-script.jpg)
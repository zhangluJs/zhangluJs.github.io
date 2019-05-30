# HTTP协议

**HTTP协议是无状态的：**
每次http请求都是独立的。在一次http请求完成后客户端会与服务器端断开链接，而当再次请求的时候服务器端就无法知道客户端目前处于什么状态，为了解决这个问题，引入了cookie和session机制来关联请求。

**HTTP协议结构：**
1. 请求报文：请求方法、请求url、版本协议、可设置的请求头部字段和内容实体
2. 响应报文：协议版本、状态码、用于解释状态的短语、可设置的响应头部字段和实体
3. cookie

**HTTP请求的几种方法：**
1. get： 用于获取数据，参数直接带在url上，明文传输，速度快，但是安全性差，所以一般用于获取数据
2. post： 用于修改数据
3. put： 上传文件
4. delete： 删除
5. head： 获得报文首部，与GET方法类似，只是不返回报文主体，一般用于验证URI是否有效
6. option：查询相应URI支持的HTTP方法


**报文头的通用字段含义（请求头与响应头都会用到的字段）：**
- Data： 发送请求时的GMT时间。
- Connection： 告诉这个user agent（通常是指浏览器）使用什么样的连接方式。在http1.1中默认值是keep-alive。keep-alive是告诉浏览器与服务器的通讯会继续保持，也就是长链接，而close就会在response后马上关闭。这里需要注意的是，HTTP是无状态的，与keep-alive是没有任何关系的，不要认为keep-alive是对HTTP无状态的改进。
- Cache-control： 告诉浏览器应该用什么缓存机制，在提高性能方面该字段十分重要，值有no-cache、no-store、max-age等
- Transfer-Encoding： 值为chunked时，代表要把数据切割成一系列的块进行传输。为identity时不做任何处理。分块的目的是为了实现长连接，有了长连接后就可以实现连接池，长连接和连接池的作用可以提高http请求性能。HTTP运行是建立在TCP连接之上，每次http请求都要经过tcp三次握手，四次挥手，慢启动等特性。使用长连接可以减少三次握手、还可以避免遇到TCP慢启动的拥塞适应阶段时间，就达到了提高性能的目的。


**请求头的字段含义：**
- Host： 服务器的域名或者IP地址
- Accept： 浏览器可以接收的内容格式，application/json(json格式)、text/plain(纯文本格式)、text/html(html格式)
- Accept-Charset： 浏览器能识别的字符集，例如Accept-Charset：utf-8
- Accept-Encoding： 浏览器可以处理的编码方式，例如Accept-Encoding：gzip/deflate
- Accept-language： 浏览器接收的语言，例如中文Accept-language：zh-cn

**响应头的字段含义：**
- Accept-Range：可接受的字节范围

**响应体的通用字段含义：**
- Allow： 资源可支持的HTTP方法
- Content-type： 定义了body体中的数据类型，常见的媒体格式类型有：text/html(HTML格式)、text/plain(纯文本格式)、image/gif(gif图片格式)，以application开头的媒体格式有：application/x-www-form-urlencoded，application/xml(XML数据格式)等
- Content-Encoding： 告诉浏览器服务器端采用的怎样的编码格式传输了正文，值有gzip（采用GUN zip编码）、deflate(采用zilib格式压缩)、compress(采用Unix文件压缩程序)
- Content-language： 响应体中使用的语言
- Cookie： 服务器端设置或者浏览器端发送一些字符串信息，包括了用户的一些基本信息，用于两端通讯


**HTTP的状态码：**
- 1xx：表示http接受到请求，准备处理
- 2xx：表示http处理完成
- 3xx：重定向（准备进一步处理）
- 4xx：失败（请求失败，语法错误，资源不存在等）
- 5xx：服务器端错误

**常见的一些状态码有：**
- 200：请求成功
- 301：请求永久重定向
- 302：请求临时重定向
- 304：请求的资源未修改，被重定向到本地缓存
- 400：客户端语法存在错误
- 401：请求没有权限
- 404：请求资源不存在
- 500：服务器端错误

```js
function ajax(method, src, data = null) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = window.XMLHttpRequest();
        } else {
            xhr = window.ActiveXObject('Microsoft XMLHTTP');
        }
        xhr.open(method, src);
        xhr.send(data);
        xhr.onreadstatechange = function () {
            if (xhr.readState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('请求失败');
                }
            } else {
                reject('请求失败');
            }
        }
    })
}

ajax('GET', 'xxx.xxx.json').then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})
```
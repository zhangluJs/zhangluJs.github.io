# Wen Storage


**WEB存储机制（localStorage & sessionStorage）**

web 存储机制包括两种：sessionStorage 和 localStorage 两种，一种是临时存储另一种则是永久存储除非手动删除。

昨天（2020/05/07）在开发某个免登录需求时需要存储用户的loginName。使用sessionStorage存储在本地后，从另一个新系统中跳转打开新的页签，即便是协议、域名、端口全部一样的页面也无法获取到之前存储的值（按照我之前的理解，新的页签中不但可以获取到这个值，还能对其进行修改），查阅资料后发现sessionStorage在打开一个新页签后会重新初始化一个新的session，即便网站是一样的，它们也不属于同一个session。解决方法将session换成了local[[转]sessionStorage在同一网站多个标签页内共享数据吗？这取决于标签页如何打开](https://blog.csdn.net/sinat_36521655/article/details/82257252)

- 1.sessionStorage 数据放在服务器上（IE不支持）。严格用于一个浏览器会话中存储数据，数据在浏览器关闭后会立即删除

- 2.localStorage 数据在客户端（低版本IE ( IE6, IE7 ) 。不支持，并且不支持查询语言）跨会话持久化地存储数据

- localStorage与sessionStorage的区别：

    localStorage只要在相同的协议、相同的主机名、相同的端口下，即同源就能读取/修改到同一份localStorage数据。

    sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在同一窗口（也就是浏览器的标签页）下。

- 用法相同：（以sessionStorage为例）

    1.添加：
        `sessionStorage.setItem(key, value);//value可以任何数据类型`

    2.获取：
        `sessionStorage.getItem(key);`

    3.删除：
        `sessionStorage.removeItem(key);//删除该存储对象中key的键值对`

    4.清除所有：
        `sessionStorage.clear();//清除该存储对象中所有的键值对`

    5.检索（查）：
        `sessionStorage.key();//检索key[n]的值`

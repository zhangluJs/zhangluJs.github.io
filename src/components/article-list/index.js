/**
 * @file 首页文章列表
 */

import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                name: 'vue与react的异同',
                path: '/vue-react-diff',
                description: '记录一下vue与react这两大热门前端框架之间的异同',
                date: '个人笔记 / 学习'
            }, {
                name: 'webpack',
                path: '/webpack',
                description: `在刚开始工作时，接触到了一些构建工具，比如gulp、grunt还有webpack。但当时总是弄不明白它们的具体概念。
                    后来通过在工作中的慢慢接触以及偶尔根据项目需要来修改其中的某些配置才渐渐明白了它们的作用。
                    在工作时始自己始终没有完整负责过一个项目的从无到有，所以利用空余时间好好啃了啃目前相对较火的webpack。`,
                date: '工具 / 学习'
            }, {
                name: 'NVM',
                path: '/nvm',
                description: `在日常工作中，我们手头经常会并行多个项目，而且各个项目之间所使用的node版本又是不同的，
                    为了解决这个问题就需要我们使用不同版本的node来分别对应不同的项目进行工作，今天接触到了一个管理node版本的工具，nvm。`,
                date: '工具 / 学习'
            }, {
                name: '前端性能优化',
                path: '/fe-performance',
                description: `对于前端的性能话题，从来都没有断绝过。因为这个东西没有最好，只有更好。而且往往也是业务的
                    繁杂程度去决定优化程度的。作为一个前端开发者，性能是我们关注的指标。它直接影响着我们的用户，同时也影响着产品本身。`,
                date: '个人笔记 / 学习'
            }, {
                name: '正则表达式',
                path: '/regexp',
                description: `RegExp 是正则表达式的缩写。当检索某个文本时，可以使用一种模式来描述要检索
                    的内容。RegExp 就是这种模式。简单的模式可以是一个单独的字符。更复杂的模式包括了更多的字符，
                    并可用于解析、格式检查、替换等等。可以规定字符串中的检索位置，以及要检索的字符类型等等。简单的学一学正则表达式`,
                date: '个人笔记 / 学习'
            }, {
                name: '浏览器缓存',
                path: '/cache',
                description: `浏览器缓存就是把一个已经请求过的Web资源（如html页面，图片，js，数据等）拷贝一份副本储存在
                    浏览器中。缓存会根据进来的请求保存输出内容的副本。当下一个请求来到的时候，如果是相同的URL，缓存会根据缓
                    存机制决定是直接使用副本响应访问请求，还是向源服务器再次发送请求。`,
                date: '个人笔记 / 学习'
            }, {
                name: 'HTTP',
                path: '/http',
                description: `HTTP--Hyper Text Transfer Protocol，超文本传输协议，是一种建立在TCP上的无状态连接，
                    整个基本的工作流程是客户端发送一个HTTP请求，说明客户端想要访问的资源和请求的动作，服务端收到请求之后，
                    服务端开始处理请求，并根据请求做出相应的动作访问服务器资源，最后通过发送HTTP响应把结果返回给客户端。
                    其中一个请求的开始到一个响应的结束称为事务，当一个事物结束后还会在服务端添加一条日志条目。`,
                date: '个人笔记 / 学习'
            }, {
                name: 'BOM/DOM',
                path: '/object-model',
                description: `由于现代浏览器已经（几乎）实现了 JavaScript 交互性方面的相同方法和属性，因此常被认为是 BOM 的方法和属性，也因此称
                    之为：浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器“对话”。/文档对象模型（DOM）是表示文档（比如HTML和XML）和访问、操作构
                    成文档的各种元素的应用程序接口（API）。通常所说的DOM是指W3C定义的标准的文档对象模型。`,
                date: '个人笔记 / 学习'
            }, {
                name: 'DOM事件',
                path: '/dom-event',
                description: 'HTML DOM 事件允许Javascript在HTML文档元素中注册不同事件处理程序。事件通常与函数结合使用，函数不会在事件发生前被执行！ (如用户点击按钮)。',
                date: '个人笔记 / 技术'
            }, {
                name: 'example',
                path: '/three',
                description: 'example',
                date: 'markdown'
            }]
        };
    }

    render() {
        let articleList = this.state.list.map((key, index) => {
            return (
                <li key={index} className='article-list-item'>
                    <h3 className='article-list-name'>
                        <NavLink to={key.path}>{key.name}</NavLink>
                    </h3>
                    <p className='article-list-description'>{key.description}</p>
                    <p className='article-list-meta'>
                        <span className='iconfont icon-biaoqian'></span>
                        {key.date}
                    </p>
                </li>
            );
        });
        return (
            <div className='container'>
                <ul>
                    {articleList}
                </ul>
            </div>
        );
    }
}

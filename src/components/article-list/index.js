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
                name: '第三年',
                path: '/three',
                description: '这里先写点啥占个位置',
                date: '2018/06/06'
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

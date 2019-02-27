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
                name: '第一年',
                path: '/one',
                description: '这里先写点啥占个位置',
                date: '个人笔记 / 技术'
            }, {
                name: '第二年',
                path: '/two',
                description: '这里先写点啥占个位置',
                date: '2018/06/06'
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
                <li key={index} className="article-list-item">
                    <h3 className="article-list-name">
                        <NavLink to={key.path}>{key.name}</NavLink>
                    </h3>
                    <p className="article-list-description">{key.description}</p>
                    <p className="article-list-meta">
                        <span className="iconfont icon-biaoqian"></span>
                        {key.date}
                    </p>
                </li>
            );
        });
        return (
            <div className="container">
                <ul>
                    {articleList}
                </ul>
            </div>
        );
    }
}

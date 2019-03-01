/**
 * @file banner
 */

import React from 'react';
import './index.scss';

export default class Banner extends React.Component {
    render() {
        return (
            <section className="banner">
                <div className="container collection-info">
                    <h1 className="meta-title">
                        <span>I am zhanglu !</span>
                    </h1>
                    <div className="meta-info">
                        <span className="banner-icon">
                            <span className="iconfont icon-location"></span>
                            Beijing, China
                        </span>
                        <span className="banner-icon">
                            <span className="iconfont icon-github"></span>
                            <a href="https://github.com/zhangluJs" target="_block">zhangluJs</a>
                        </span>
                    </div>
                </div>
            </section>
        );
    }
}

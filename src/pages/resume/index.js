/**
 * @file resume
 * @date 2021/06/26
 */

import React from 'react';
import './index.scss';
export default class Resume extends React.Component {
    render() {
        return (
            <div className="resume-container">
                <header className="resume-container-head">
                    <section className="resume-container-head-title">
                        <h1>张璐</h1>
                        <div className="job">
                            <h2>web前端开发<small> / 北京</small></h2>
                        </div>
                    </section>
                    <ul className="resume-container-head-info">
                        <li>男 / 1993.12</li>
                        <li>本科 / 4年工作经验</li>
                        <li>华中师范大学</li>
                    </ul>
                    <ul className="resume-container-head-contact">
                        <li>
                            <a href="https://zhanglujs.github.io/blog" target="_blank">
                                https://zhanglujs.github.io/blog
                                <span className="iconfont icon-Homehomepagemenu"></span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/zhangluJs" target="_blank">
                                https://github.com/zhangluJs
                                <span className="iconfont icon-github-copy"></span>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:zhangluecma@163.com" target="_blank">
                                zhangluecma@163.com
                                <span className="iconfont icon-emailFilled"></span>
                            </a>
                        </li>
                        <li>
                            <a href="tel:15210205880" target="_blank">
                                15210205880
                                <span className="iconfont icon-phone"></span>
                            </a>
                        </li>
                    </ul>
                </header>
                <div className="resume-container-body">
                    <h3 className="title">
                        专业能力
                    </h3>
                    <ul className="info">
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>熟练使用<strong>H5</strong>、<strong>CSS3</strong>、<strong>页面布局</strong>、<strong>响应式布局</strong>等，重视<strong>页面交互</strong>与<strong>用户体验</strong>。
                        </li>
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>熟练使用<strong>ES6</strong>语法编程，追求代码<strong>高质量可维护性</strong>。熟悉<strong>异步</strong>、<strong>网络请求</strong>等基本内容。
                        </li>
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>熟练使用<strong>Vue</strong>。注重代码的<strong>复用性</strong>，能够将其抽离出来为<strong>公共的组件</strong>供团队使用。
                        </li>
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>熟悉<strong>React</strong>以及<strong>React Hooks</strong>等相关特性。
                        </li>
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>对<strong>Node.js</strong>、<strong>模块化规范</strong>、<strong>CSS预处理器</strong>、<strong>数据可视化</strong>、<strong>性能优化</strong>、<strong>前端安全</strong>等也有一定的应用。
                        </li>
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>熟练使用<strong>Git</strong>进行版本控制和代码管理、了解项目常规<strong>开发流程</strong>、<strong>开发调试技巧</strong>，了解简单的<strong>Linux</strong>命令。
                        </li>
                        <li className="info-item">
                            <span className="iconfont icon-dian"></span>工作上<strong>积极执行</strong><strong>有责任心</strong>，具有良好的<strong>团队沟通合作</strong>能力以及<strong>学习能力</strong>。
                        </li>
                    </ul>
                    <h3 className="title">
                        工作经历
                    </h3>
                    <ul className="info">
                        <li className="info-item">
                            <span className="info-item-time"><strong>2019.06 ～ 至今</strong></span>
                            <span className="info-item-name"><strong>首汽租赁有限责任公司</strong></span>
                            <p className="info-item-desc">负责项目中接入技术的前期调研（web页面接入萤石云监控、高德地图电子围栏绘制等）</p>
                            <p className="info-item-desc">项目开发中的技术支持（公共模块的开发等）</p>
                            <p className="info-item-desc">整站需求的开发、bugfix（多页签不同用户登录信息不同步的bug，系统间跳转免登录等）</p>
                            <p className="info-item-desc">各方资源的协调（需求明确、接口数据格式定义、进度排期等）</p>
                        </li>
                        <li className="info-item">
                            <span className="info-item-time"><strong>2017.08 ～ 2019.06</strong></span>
                            <span className="info-item-name"><strong>软通动力</strong></span>
                            <p className="info-item-desc">负责糯米后台需求的迭代开发、包括需求评审、提测上线支持等</p>
                            <p className="info-item-desc">负责一站式登录的改版开发等</p>
                        </li>
                    </ul>
                    <h3 className="title">
                        项目经历
                    </h3>
                    <li className="info-item">
                        <span className="info-item-time"><strong>2019.08 ～ 至今</strong></span>
                        <span className="info-item-name"><strong>综合管理平台、短租管理平台</strong></span>
                        <p className="info-item-desc">
                            技术栈主要使用<strong>Vue-cli</strong>、<strong>Element-ui</strong>。
                        </p>
                        <p className="info-item-desc">
                            负责系统迭代更新。维保，BI数据可视化、CRM、计算器等模块的开发。
                        </p>
                        <p className="info-item-desc">
                            开发系了统中关于电子围栏的公共组件，调用高德地图api，完成圆形、多边形的电子围栏绘制，以及切换城市时地图及围栏中心点的初始化。
                            开发文件上传后回显list组件开发，暴露出删除文件、查看当前文件等回调函数。
                            通过监听visibilitychange事件+visibilityState+localStorage，修复了系统多页签中用户登录信息错误的bug等。
                        </p>
                    </li>
                    <li className="info-item">
                        <span className="info-item-time"><strong>2019.10 ～ 2019.11</strong></span>
                        <span className="info-item-name"><strong>移动端短租自驾项目开发</strong></span>
                        <p className="info-item-desc">
                            技术栈<strong>React全家桶</strong>、<strong>antd-mobile</strong>。
                        </p>
                        <p className="info-item-desc">
                            主要负责了项目中首页、城市选择页面开发。
                        </p>
                        <p className="info-item-desc">
                            调用高德api获取当前用户经纬度，请求接口推送距离最近的门店方便用户租车。
                        </p>
                        <p className="info-item-desc">
                            城市选择页面将输入搜索、城市列表、右侧字母导航拆分成独立的组件。通过自定义属性、自定义事件来完成组件间通信。
                            包括当前城市定位、联想输入、右侧点击字母跳转到对应的城市列表等
                        </p>
                    </li>
                    <h3 className="title">
                        个人项目
                    </h3>
                    <li className="info-item">
                        <span className="info-item-time"><strong>2018.09 ～ 至今</strong></span>
                        <span className="info-item-name">
                            <strong>
                                <a className="link" href="https://zhanglujs.github.io/blog" target="_blank">
                                    个人博客
                                    <span className="iconfont icon-lianjie"></span>
                                </a>
                            </strong>
                        </span>
                        <p className="info-item-desc">
                            前端部分使用<strong>React</strong>开发。
                        </p>
                        <p className="info-item-desc">
                            构建工具使用<strong>webpack</strong>进行配置。其中配置了<strong>babel-loader</strong>用于兼容ES6语法、<strong>file-loader</strong>解析字体文件、<strong>babel-loader!markdown-it-react-loader</strong>解析md文件等。
                            plugins部分使用<strong>HtmlWebpackPlugin</strong>、<strong>CleanWebpackPlugin</strong>、<strong>CopyWebpackPlugin</strong>等完成build后文件的处理。
                        </p>
                        <p className="info-item-desc">
                            文档部分使用<strong>markdown</strong>进行编辑。
                        </p>
                        <p className="info-item-desc">
                            使用<strong>gitpage</strong>通过访问静态文件的方式完成部署。
                        </p>
                    </li>
                </div>
                <footer className="resume-container-footer">
                    <a href="https://zhanglujs.github.io/blog/dist/#/resume" target="_blank">
                        <span className="iconfont icon-lianjie"></span>
                        &nbsp;&nbsp;网页版简历 https://zhanglujs.github.io/blog/dist/#/resume
                    </a>
                </footer>
            </div>
        );
    }
}
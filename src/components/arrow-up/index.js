/**
 * @file 返回顶部
 */

import React from 'react';
import './index.scss';

export default class ArrowUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        };
        this.scrollTop = this.scrollTop.bind(this);
    }

    componentDidMount() {
        let self = this;
        function scrollFn() {
            let scrollY = window.scrollY;
            let isShow = false;
            if (scrollY > 256) {
                isShow = true;
            } else {
                isShow = false;
            }
            self.setState({
                isShow
            });
        }

        function debounce(method, context) {
            clearTimeout(method.tId);
            method.tId = setTimeout(() => {
                method.call(context);
            }, 500);
        }

        window.addEventListener('scroll', () => {
            debounce(scrollFn, window);
        });
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    render() {
        const isShow = this.state.isShow;
        return (
            <div
                className='arrow-up'
                style={{display: isShow ? 'block' : 'none'}}
                onClick={this.scrollTop}>
                <span className='iconfont icon-huidaodingbu'></span>
            </div>
        );
    }
}

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

        function debounce(fn, delay) {
            let timer = null;
            return function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    fn.apply(this, [...arguments]);
                    timer = null;
                }, delay);
            }
        }

        window.addEventListener('scroll', debounce(scrollFn, 300));
    }

    scrollTop() {
        (function smoothscroll(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0,currentScroll - (currentScroll/5));
            }
        })();
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

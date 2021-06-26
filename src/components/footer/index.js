/**
 * @file footer
 */

import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';

export default class footer extends React.Component {
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
        let {pathname} = this.props.location;
        return (
            pathname === '/resume' ? '' : <footer className="nav-footer">
                <div className="container">
                    <p className="copyright">
                        © zhang lu
                        <NavLink to="/home">首页</NavLink>
                        <NavLink to="/home">关于</NavLink>
                    </p>
                    <a className="bank-top" onClick={this.scrollTop.bind(this)}>TOP</a>
                </div>
            </footer>
        );
    }
}

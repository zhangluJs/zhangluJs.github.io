/**
 * @file footer
 */

import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';

export default class footer extends React.Component {
    render() {
        return (
            <footer className="nav-footer">
                <div className="container">
                    <p className="copyright">
                        © zhang lu
                        <NavLink to="/home">首页</NavLink>
                        <NavLink to="/home">关于</NavLink>
                    </p>
                    <a className="bank-top" href="javascript:window.scrollTo(0,0)">TOP</a>
                </div>
            </footer>
        );
    }
}

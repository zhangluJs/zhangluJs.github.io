import React from 'react';
import './index.scss';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <ul className="nav-list">
                <li className="list-item" onClick={this.addClassName}>
                    <a href="#">内容</a>
                </li>
                <li className="list-item">
                    <a href="#">关于我</a>
                </li>
            </ul>
        );
    }
}

class Header extends React.Component {
    render () {
        return (
            <header className="header">
                <a link="#" className="logo">
                    <img src="../../../static/favicon.png"/>
                </a>
                <List />
            </header>
        )
    }
}

export default Header;
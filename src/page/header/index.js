import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Content from '../content/index.js';
import About from '../about/index.js';
import './index.scss';

class Header extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <div>
                    <header className="header">
                        <a link="#" className="logo">
                            <img src="../../static/favicon.png"/>
                        </a>
                        <ul className="nav-list">
                            <li className="list-item"><Link to="/content">内容</Link></li>
                            <li className="list-item"><Link to="/about">关于</Link></li>
                        </ul>
                    </header>
                    <Route exact path="/" component={Content}/>
                    <Route path="/content" component={Content}/>
                    <Route path="/about" component={About}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default Header;
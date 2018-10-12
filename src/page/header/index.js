import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import './index.scss';

class Header extends React.Component {
    render () {
        return (
            <header className="header" style={{ background : this.props.themeColor }}>
                <div className="container">
                    <img className="logo" src="../../../static/favicon.png"/>
                    <ul className="nav-list">
                        <li className="list-item"><NavLink to="/content" activeClassName="active-item">内容</NavLink></li>
                        <li className="list-item"><NavLink to="/about" activeClassName="active-item">关于我</NavLink></li>
                    </ul>
                </div> 
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
Header = connect(mapStateToProps)(Header)

export default Header;
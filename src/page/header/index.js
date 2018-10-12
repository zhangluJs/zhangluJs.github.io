import React from 'react';
import {NavLink} from 'react-router-dom';
import { ColorPicker } from 'element-react';
import { connect } from 'react-redux';
import './index.scss';

class Header extends React.Component {
    constructor() {
        super();
        this.handleSwitchColor = this.handleSwitchColor.bind(this);
    }

    // dispatch action 去改变颜色
    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }

    render () {
        const color2 = '#409eff';
        return (
            <header className="header" style={{ background : this.props.themeColor }}>
                <div className="container">
                    <img className="logo" src="../../../static/favicon.png"/>
                    <ul className="nav-list">
                        <li className="list-item"><NavLink to="/content" activeClassName="active-item">内容</NavLink></li>
                        <li className="list-item"><NavLink to="/about" activeClassName="active-item">关于我</NavLink></li>
                        <li className="list-item">
                            <ColorPicker
                                value={color2}
                                onChange={this.handleSwitchColor.bind(color2)}>
                            </ColorPicker>
                        </li>
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
const mapDispatchToProps = (dispatch) => {
    return {
        onSwitchColor: (color) => {
            dispatch({ type: 'CHANGE_COLOR', themeColor: color })
        }
    }
}

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;
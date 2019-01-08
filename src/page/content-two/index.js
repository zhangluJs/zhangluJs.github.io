/**
 * @file page-two
 */

import React from 'react';
import {Button} from 'element-react';
import {connect} from 'react-redux';

import 'element-theme-default';
class ContentTwo extends React.Component {
    constructor() {
        super();
        this.state = {
            themeColor: ''
        };
    }

    // dispatch action 去改变颜色
    handleSwitchColor(color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color);
        }
    }
    render() {
        return (
            <div>
                <Button
                    style={{color: this.props.themeColor}}
                    onClick={this.handleSwitchColor.bind(this, 'red')}>
                    Red
                </Button>
                <Button
                    style={{
                        color: this.props.themeColor
                    }}
                    onClick={this.handleSwitchColor.bind(this, 'blue')}>
                    Blue
                </Button>
                <Button
                    style={{
                        color: this.props.themeColor
                    }}
                    onClick={this.handleSwitchColor.bind(this, '#409eff')}>
                    默认颜色
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        themeColor: state.themeColor
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onSwitchColor: color => {
            dispatch({type: 'CHANGE_COLOR', themeColor: color});
        }
    };
};

ContentTwo = connect(mapStateToProps, mapDispatchToProps)(ContentTwo);

export default ContentTwo;

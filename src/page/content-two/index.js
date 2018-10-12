import React from 'react';
import { Button } from 'element-react';
import { connect } from 'react-redux'

import 'element-theme-default';
class ContentTwo extends React.Component {
    constructor () {
        super()
        this.state = { themeColor: '' }
    }
    
      // dispatch action 去改变颜色
    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }
    render () {
        return (
            <div>
                <button 
                    style={{ color: this.props.themeColor }}
                    onClick={this.handleSwitchColor.bind(this,'red')}>
                    Red
                </button>
                <button 
                    style={{ color: this.props.themeColor }}
                    onClick={this.handleSwitchColor.bind(this,'blue')}>
                    Blue
                </button>
            </div>
            // <div>第二年的经历学劲没那么大了，然后就开始工作了。<Button>123</Button></div>
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

ContentTwo = connect(mapStateToProps, mapDispatchToProps)(ContentTwo);

export default ContentTwo;
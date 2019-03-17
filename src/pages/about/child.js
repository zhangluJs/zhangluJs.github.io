import React from 'react';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
    }

    changeMsg = () => {
        this.props.callbank('对～ 我是子组件');
    }
    render() {
        return (
            <div onClick={this.changeMsg}>{this.props.msg}</div>
        );
    }
}

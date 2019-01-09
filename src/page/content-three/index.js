/**
 * @file page-three
 */
import React from 'react';
import {connect} from 'react-redux';

class ContentThree extends React.Component {
    render() {
        return (
            <div style={{
                color: this.props.themeColor
            }}>第三年的跌宕起伏，幡然醒悟。目前在好好学习！</div>
        );
    }
}

const mapStateToprops = state => {
    return {
        themeColor: state.themeColor
    };
};

ContentThree = connect(mapStateToprops)(ContentThree);

export default ContentThree;

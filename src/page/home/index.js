/**
 * @file 页面主题
 */

import React from 'react';
import Banner from '../banner/index.js';
import Articlelist from '../article-list/index.js';

import './index.scss';

export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <Banner></Banner>
                <Articlelist></Articlelist>
            </div>
        );
    }
}

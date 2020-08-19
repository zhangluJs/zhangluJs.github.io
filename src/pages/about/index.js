/**
 * @file react组件
 */

import React from 'react';
import './index.scss';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container about-wrap">
                <img className="photo" src="./static/img/IMG_0453.JPG"/>
                <div className="mp3-icon">
                    <audio controls="controls" autoPlay="autoplay">
                        <source src="http://music.163.com/song/media/outer/url?id=1373002687.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <img src="./static/img/b.jpg"></img>
                </div>
            </div>
        );
    }
}

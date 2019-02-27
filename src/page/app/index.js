/**
 * @file 页面主题
 */

import React from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Header from '../header/index.js';
import Home from '../home/index.js';
import About from '../about/index.js';
import ContentThree from '../content-three/index.md';

import './index.scss';

export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className='app'>
                    <Switch>
                        <Route path="/:place" component={Header} />
                    </Switch>
                    <main className='main'>
                        <Switch>
                            {/* <Route exact path="/" component={Content}></Route> */}
                            <Route path='/home' component={Home}></Route>
                            <Route path='/about' component={About}></Route>
                            <Route path='/three' component={ContentThree}></Route>
                            <Redirect from='/' to='/home'></Redirect>
                        </Switch>
                    </main>
                </div>
            </HashRouter>
        );
    }
}

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
import Header from '../../components/header/index.js';
import Footer from '../../components/footer/index.js';
import Arrowup from '../../components/arrow-up/index.js';
import Home from '../home/index.js';
import About from '../about/index.js';
import ContentThree from '../content-three/index.md';
import DomEvent from '../../markdown/domevent.md';
import objectModel from '../../markdown/object-model.md';
import http from '../../markdown/http.md';
import cache from '../../markdown/cache.md';
import regExp from '../../markdown/regexp.md';
import fePerformance from '../../markdown/fe-performance.md';
import nvm from '../../markdown/nvm.md';
import webpack from '../../markdown/webpack.md';
import vueReactDiff from '../../markdown/vue-react-diff.md';
import jsAsync from '../../markdown/js-async.md';
import mall from '../../markdown/mall.md';
import linux from '../../markdown/linux.md';
import git from '../../markdown/git.md';
import someUrl from '../../markdown/some-url.md';

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
                            <Route path='/object-model' component={objectModel}></Route>
                            <Route path='/dom-event' component={DomEvent}></Route>
                            <Route path='/http' component={http}></Route>
                            <Route path='/cache' component={cache}></Route>
                            <Route path='/regexp' component={regExp}></Route>
                            <Route path='/fe-performance' component={fePerformance}></Route>
                            <Route path='/nvm' component={nvm}></Route>
                            <Route path='/three' component={ContentThree}></Route>
                            <Route path='/webpack' component={webpack}></Route>
                            <Route path='/vue-react-diff' component={vueReactDiff}></Route>
                            <Route path='/js-async' component={jsAsync}></Route>
                            <Route path='/mall-demo' component={mall}></Route>
                            <Route path='/linux' component={linux}></Route>
                            <Route path='/git' component={git}></Route>
                            <Route path='/some-url' component={someUrl}></Route>
                            <Redirect from='/' to='/home'></Redirect>
                        </Switch>
                    </main>
                    <Footer></Footer>
                    <Arrowup></Arrowup>
                </div>
            </HashRouter>
        );
    }
}

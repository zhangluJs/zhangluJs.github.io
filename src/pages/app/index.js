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
import promise from '../../markdown/promise.md';
import scriptAttr from '../../markdown/script-attr.md';
import matrixDigitalRain from '../../markdown/matrix-digital-rain/index.js';
import htmlPlaceholder from '../../markdown/html-placeholder.md';
import renderwebPage from '../../markdown/render-web-page.md';
import throttleDebounce from '../../markdown/throttle-debounce.md';
import webStorage from '../../markdown/web-storage.md';
import css from '../../markdown/css.md';
import react from '../../markdown/react.md';
import courseStudy from '../../markdown/courseStudy.md';
import lajifenlei from '../../markdown/lajifenlei.md';
import typescript from '../../markdown/typescript.md';
import varAndFunVariable from '../../markdown/varAndFunVariable.md';
import luDesign from '../../markdown/lu-design.md';
import sass from '../../markdown/sass.md';
import basics from '../../markdown/basics.md';
import vue from '../../markdown/vue.md';
import resume from '../resume/index';
import vue3 from '../../markdown/vue3.md';

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
                            <Route path='/promise' component={promise}></Route>
                            <Route path='/script-attr' component={scriptAttr}></Route>
                            <Route path='/matrix-digital-rain' component={matrixDigitalRain}></Route>
                            <Route path='/html-placeholder' component={htmlPlaceholder}></Route>
                            <Route path='/render-web-page' component={renderwebPage}></Route>
                            <Route path='/throttle-debounce' component={throttleDebounce}></Route>
                            <Route path='/web-storage' component={webStorage}></Route>
                            <Route path='/css' component={css}></Route>
                            <Route path='/react' component={react}></Route>
                            <Route path='/courseStudy' component={courseStudy}></Route>
                            <Route path='/lajifenlei' component={lajifenlei}></Route>
                            <Route path='/typescript' component={typescript}></Route>
                            <Route path='/varAndFunVariable' component={varAndFunVariable}></Route>
                            <Route path='/LuDesign' component={luDesign}></Route>
                            <Route path='/sass' component={sass}></Route>
                            <Route path='/basics' component={basics}></Route>
                            <Route path='/vue' component={vue}></Route>
                            <Route path='/resume' component={resume}></Route>
                            <Route path='/vue3' component={vue3}></Route>
                            <Redirect from='/' to='/home'></Redirect>
                        </Switch>
                    </main>
                    <Route path="/:place" component={Footer} />
                    <Arrowup></Arrowup>
                </div>
            </HashRouter>
        );
    }
}

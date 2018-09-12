import React from 'react';
import {HashRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import Header from '../header/index.js';
import Content from '../content/index.js';
import About from '../about/index.js';
import './index.scss';


class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div className="app">
                    <Header />
                    <main className="main">
                        <Route exact path="/" component={Content}></Route>
                        <Route path="/content" component={Content}></Route>
                        <Route path="/about" component={About}></Route>
                    </main>
                </div>
            </HashRouter>
        )
    }
}

export default App;
import React from 'react';
import {HashRouter, Route, NavLink, Switch} from 'react-router-dom';
import './index.scss'
import ContentOne from '../content-one/index.js';
import ContentTwo from '../content-two/index.js';

function SideBar(props) {
    let menu = props.navList.map(item => {
        let list = item.list.map((key, index) => {
            return (
                <li key={index}><NavLink to={key.path}>{key.name}</NavLink></li>
            )
        })
        return (
            <div key={item.name}>
                <p>{item.name}</p>
                <ul>
                    {list}
                </ul>
            </div>
        )
    })
    return (
        <div className="sidebar-wrap">
            {menu}
        </div>
    )
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navList: [
                {
                    name: '经历',
                    list: [{
                        name: '第一年',
                        path: '/content/one'
                    }, {
                        name: '第二年',
                        path: '/content/two'
                    }, {
                        name: '第三年',
                        path: '/content/three'
                    }]
                }
            ]
        }
    }
    componentDidMount() {
        console.log('这里是content')
    }
    render () {
        return (
            <section className="content">
                <SideBar navList={this.state.navList}/>
                <div className="content-right">
                    <Switch>
                        <Route exact path="/" component={ContentOne}></Route>
                        <Route path='/content/one' component={ContentOne}></Route>
                        <Route path='/content/two' component={ContentTwo}></Route>
                        <Route path="/content" component={ContentOne}></Route>
                    </Switch>
                </div>
            </section>                 
        )
    }
}

export default Content;
import React from 'react';
import {HashRouter, Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './index.scss'
import ContentOne from '../content-one/index.js';
import ContentTwo from '../content-two/index.js';
import ContentThree from '../content-three/index.js';

import {connect} from 'react-redux';

function SideBar(props) {
    let menu = props.navList.map(item => {
        let list = item.list.map((key, index) => {
            return (
                <li key={index}><NavLink to={key.path} activeClassName='active-class' style={{color: props.color}}>{key.name}</NavLink></li>
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
                <SideBar navList={this.state.navList} color={this.props.themeColor}/>
                <div className="content-right">
                    <Switch>
                        <Route exact path="/" component={ContentOne}></Route>
                        <Route path='/content/one' component={ContentOne}></Route>
                        <Route path='/content/two' component={ContentTwo}></Route>
                        <Route path='/content/three' component={ContentThree}></Route>
                        <Redirect from='/content' to='/content/one'></Redirect>
                    </Switch>
                </div>
            </section>                 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}

Content = connect(mapStateToProps)(Content);

export default Content;
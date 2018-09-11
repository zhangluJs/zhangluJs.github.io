import React from 'react';


class Content extends React.Component {
    componentDidMount() {
        console.log('这里是content')
    }
    render () {
        return (
            <div>这里是一个content的组件</div>
        )
    }
}

export default Content;
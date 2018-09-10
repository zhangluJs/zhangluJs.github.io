import React from 'react';
import Header from '../header/index.js';
import './index.scss';



class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <Header />
            </div>
        )
    }
}

export default Home;
import React from 'react';

class ContentOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '这里是一个input输入框',
            radio: true
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit() {
        alert(this.state.value)
    }

    render () {
        return (
            <div>
                <p>这里要写的就是第一年的经历，也就是上学，学啊学，努力学！</p>
                <label>
                    Name:
                    <input type='text' value={this.state.value} onChange={this.handleInput}/>
                </label>
                <label>
                    男：
                    <input type='radio' value={this.state.radio} name='sex'/>
                </label>
                <label>
                    女：
                    <input type='radio' value={this.state.radio} name='sex'/>
                </label>
                <button onClick={this.handleSubmit}>submit</button>  
            </div>
        )
    }
}

export default ContentOne;
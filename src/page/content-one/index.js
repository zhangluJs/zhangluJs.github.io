/**
 * @file one-page
 */

import React from 'react';
import './index.scss';
export default class ContentOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '这里是一个input输入框',
            radio: true,
            sex: 'men',
            checkbox: ['土豆'],
            select: 'lime'
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleInput(e) {
        let value = e.target.value;
        this.setState({
            value
        });
    }

    handleSubmit() {
        let {
            select,
            sex,
            checkbox,
            value
        } = this.state;
        console.log(value, sex, checkbox, select);
    }

    handleRadio(e) {
        let value = e.target.value;
        this.setState({
            sex: value
        });
    }

    handleCheckbox(e) {
        let {value, checked} = e.target;
        let index = this.state.checkbox.indexOf(value);
        let list = this.state.checkbox;
        if (checked && index === -1) {
            list.push(value);
        }
        else {
            list.splice(index, 1);
        }
        this.setState({
            checkbox: list
        });
    }

    handleSelect(e) {
        let value = e.target.value;
        this.setState({
            select: value
        });
    }

    render() {
        const {
            value,
            sex,
            checkbox
        } = this.state;
        const list = ['白菜', '土豆', '香菜'];
        return (
            <div className='content-one'>
                <p>这里要写的就是第一年来北京的经历，也就是上学，学啊学，努力学！</p>
                <p>这里主要看一下表单</p>
                <div className='input-item'>
                    <label>
                        Name:
                        <input type='text' value={this.state.value} onChange={this.handleInput}/>
                    </label>
                    <span>{this.state.value}</span>
                </div>
                <div>
                    性别：
                    <label>
                        男：
                        <input
                            type='radio'
                            value='men'
                            name='sex'
                            checked={sex === 'men'}
                            onChange={this.handleRadio} />
                    </label>
                    <label>
                        女：
                        <input
                            type='radio'
                            value='women'
                            name='sex'
                            checked={sex === 'women'}
                            onChange={this.handleRadio} />
                    </label>
                </div>
                <div className='input-item'>
                    蔬菜：
                    {
                        list.map((item, index) => {
                            return (
                                <label key={index}>
                                    {item}
                                    <input
                                        type='checkbox'
                                        value={item}
                                        checked={checkbox.indexOf(item) !== -1}
                                        onChange={this.handleCheckbox}/>
                                </label>
                            );
                        })
                    }
                </div>
                    <div className='input-item'>
                        <select value={this.state.select} onChange={this.handleSelect}>
                            <option value='limt'>limt</option>
                            <option value='group'>ground</option>
                        </select>
                    </div>
                    <button onClick={this.handleSubmit}>submit</button>
                </div>
            );
    }
}

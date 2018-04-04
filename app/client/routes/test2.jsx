import React, {Component} from 'react';
import {Button} from "semantic-ui-react";

class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {time: 0};
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({time: this.state.time + 1}), 1000/this.props.speed);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        switch (this.props.kind) {
            case 'div':
                return <div>{this.state.time}</div>;
            case 'input':
                return <div><input value={this.state.time}/></div>;
            case 'button':
                return <div><Button>{this.state.time}</Button></div>;
        }
    }
}

export default class Test2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elements: [
                {type: 'div', id:"a", speed: 1},
                {type: 'input', id:"b", speed: 2},
                {type: 'button', id:"c", speed: 3},
            ]
        };

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        const elements = this.state.elements;
        this.setState({
            elements: [elements[2], elements[0], elements[1]],
        });
    }

    render() {
        return (
            <div className="indexPage">
                <Button basic onClick={this.onButtonClick}>Shuffle</Button>
                {this.state.elements.map((val, id) => (
                    <Timer kind={val.type} speed={val.speed} key={val.id} />
                ))}
            </div>
        );
    }
}
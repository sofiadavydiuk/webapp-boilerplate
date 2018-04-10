import React, {Component} from 'react';
import {Button} from "semantic-ui-react";

// DESCRUPTURING

let foo0 = (props) => {
    let kek = props.kek;
};

// let foo1 = (props) => {
//     let variable = "123";
//     let {kek: variable} = {kek: "123"};
//
//     let {kek} = {kek: "123"};
//     let {kek} = props;
// };

let foo2 = ({kek}) => {

};

let foo3 = (list) => {
    const a = list[0];
    const b = list[1];
    const c = list[2];
};

let foo4 = (list) => {
    const [a, b, c] = list;
};

let foo5 = ([a, b, c]) => {

};

/*


 */

// ======= PURE COMPONENTS ======

export const Lambda = ({visible, text, ...rest}) => (
    <Button hidden={!visible} {...rest}>{text}</Button>
);

export function Foo({visible, red, ...rest}) {
    const color = red ? "red" : undefined;

    return (
        <Button hidden={!visible} color={color} {...rest}>Foo</Button>
    );
}

// ====== IMPURE COMPONENTS ======

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
    }

    onButtonClick() {
        this.setState({
            modal: true,
        });
    }

    render() {
        return (
            <div className="indexPage">
                <Lambda visible text="Lambda" basic onClick={this.onButtonClick} />
                <Foo visible red basic />
                <Modal open={this.state.modal} closeIcon onClose={() => this.setState({modal: false})} />
            </div>
        );
    }
}
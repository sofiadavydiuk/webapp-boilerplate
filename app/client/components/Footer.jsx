import React from "react";
import {Menu} from "semantic-ui-react";

export default class Footer extends React.Component {
    render() {
        return (
            <Menu inverted className="footer">
                <Menu.Item>
                    Copyright &copy; SofiLime 2018 Junior React Developer
                </Menu.Item>
            </Menu>
        );
    }
}

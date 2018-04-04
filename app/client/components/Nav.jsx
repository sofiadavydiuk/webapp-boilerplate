import React from "react";
import {NavLink} from "react-router-dom";
import {Menu} from 'semantic-ui-react'


export default function Nav({extra}) {
    return (
        <Menu inverted className="nav">
            <Menu.Item as={NavLink} to="/" exact>
                Home
            </Menu.Item>

            <Menu.Item as={NavLink} to="/smartphones">
                Smartphones
            </Menu.Item>

            <Menu.Item as={NavLink} to="/tablets">
                Tablets
            </Menu.Item>

            <Menu.Item as={NavLink} to="/tvs">
                TV
            </Menu.Item>

            {extra}
        </Menu>
    );
}


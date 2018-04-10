import React from "react";
import qs from "query-string";
import isNode from "detect-node";
import {Dropdown, Input, Menu} from "semantic-ui-react";


export default class Filters extends React.Component {

    constructor() {
        super();

        const params = isNode ? {} : qs.parse(location.search);

        this.state = {
            filter: params.filter || [],
            sort: params.sort || null,
            search: params.search || "",
        };

        this.onParameterChange = this.onParameterChange.bind(this);
    }

    async onParameterChange(name, value) {
        this.setState({
            [name]: value,
        });

        if (history.pushState) {
            const search = qs.parse(location.search);
            search[name] = value || undefined;
            const newurl = location.protocol + "//" + location.host + location.pathname + "?" + qs.stringify(search);
            window.history.pushState({path: newurl}, '', newurl);
        }
        this.props.onChange(name, value);
    }

    render() {
        const {} = this.props;

        const filterOptions = [
            {
                text: 'Apple',
                value: "APPLE"
            },
            {
                text: 'Samsung',
                value: "SAMSUNG"
            },
            {
                text: 'LG',
                value: "LG"
            },
        ];

        const sortOptions = [
            {
                text: 'By Name',
                description: 'A-Z',
                value: "NAME_ASC",
            },
            {
                text: 'By Name',
                description: 'Z-A',
                value: "NAME_DESC",
            },
            {
                text: 'By Price',
                description: 'Lower First',
                value: "PRICE_ASC",
            },
            {
                text: 'By Price',
                description: 'Higher First',
                value: "PRICE_DESC",
            },
        ];




        return (
            <React.Fragment>
                <Dropdown className="item"
                          placeholder='Filters'
                          selection multiple
                          value={this.state.filter}
                          onChange={(ev, {value}) => this.onParameterChange("filter", value)}
                          options={filterOptions}/>

                <Dropdown className="item"
                          placeholder='Sorting'
                          selection
                          value={this.state.sort}
                          onChange={(ev, {value}) => this.onParameterChange("sort", value)}
                          options={sortOptions}/>

                <Menu.Item className="extraInput">
                    <Input placeholder='Search...'
                           onChange={(ev, {value}) => this.onParameterChange("search", value)}
                           value={this.state.search}
                           transparent
                           icon="search"/>
                </Menu.Item>
            </React.Fragment>
        );
    }
}


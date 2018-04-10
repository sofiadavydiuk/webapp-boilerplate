import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";
import qs from "query-string";
import isNode from 'detect-node';
import requestJSON from "../helpers/requestJSON";
import ItemCollection from "../components/ItemCollection";
import Filters from "../components/Filters";

const Product = ({data}) => (
    <Card>
        <Image src={data.logo}/>
        <Card.Content>
            <Card.Header>
                {data.name}
            </Card.Header>
            <Card.Meta>
        <span className='date'>
            {data.price}
        </span>
            </Card.Meta>
            <Card.Description>
                {data.description}
            </Card.Description>
        </Card.Content>
    </Card>
);


export default class Products extends React.Component {
    constructor() {
        super();

        this.state = {
            products: [],
            sort: "price",
            filter: '',
            pageCount: 0,
            ...getInitialData(),
        };

        this.updateItems = this.updateItems.bind(this);
    }

    async updateItems() {
        this.setState({
            ...(await requestJSON()),
        });
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    render() {
        return (
            <React.Fragment>
                <Nav extra={
                    <React.Fragment>
                        <Menu.Item className="extraPadding"/>
                        <Filters onChange={this.updateItems}/>
                    </React.Fragment>
                }/>
                <ItemCollection  ItemComponent={Product}
                                 items={this.state.products}
                                 pageCount={this.state.pageCount}
                                 onPageChange={this.updateItems}/>
            </React.Fragment>
        )
    }

}


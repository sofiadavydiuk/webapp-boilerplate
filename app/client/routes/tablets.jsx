import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Icon, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";
import ItemCollection from "../components/ItemCollection";
import requestJSON from "../helpers/requestJSON";
import Filters from "../components/Filters";


const Tablet = ({data}) => (
    <Card>
        <Image src={data.logo}/>
        <Card.Content>
            <Card.Header center>
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

export default class Tablets extends React.Component {
    constructor() {
        super();

        this.state = {
            tablets: [],
            sort: "price",
            filter: "",
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
                        <Filters onChange={this.updateItems} />
                    </React.Fragment>
                }/>
                <ItemCollection  ItemComponent={Tablet}
                                 items={this.state.tablets}
                                 pageCount={this.state.pageCount}
                                 onPageChange={this.updateItems} />
            </React.Fragment>
        )
    }

}

import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";
import requestJSON from "../helpers/requestJSON";
import ItemCollection from "../components/ItemCollection";
import Filters from "../components/Filters";

const SmartPhone = ({data}) => (
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


export default class Smartphones extends React.Component {
    constructor() {
        super();

        this.state = {
            smartphones: [],
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
                        <Filters onChange={this.updateItems} />
                    </React.Fragment>
                }/>
                <ItemCollection  ItemComponent={SmartPhone}
                                 items={this.state.smartphones}
                                 pageCount={this.state.pageCount}
                                 onPageChange={this.updateItems} />
            </React.Fragment>
        )
    }

}


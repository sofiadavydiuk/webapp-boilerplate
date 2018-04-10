import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Icon, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";
import ItemCollection from "../components/ItemCollection";
import requestJSON from "../helpers/requestJSON";
import Filters from "../components/Filters";


const Tvs = ({data}) => (
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
                Matthew is a musician living in Nashville.
            </Card.Description>
        </Card.Content>
    </Card>
);


export default class Tv extends React.Component {
    constructor() {
        super();

        this.state = {
            tvs: [],
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
                <ItemCollection  ItemComponent={Tvs}
                                 items={this.state.tvs}
                                 pageCount={this.state.pageCount}
                                 onPageChange={this.updateItems} />
            </React.Fragment>
        )
    }

}

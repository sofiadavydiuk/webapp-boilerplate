import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Icon, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";


const Tablet = ({data}) => (
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
               This is the best product ever.
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
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    render() {
        let tablets = this.state.tablets;

        if (this.state.sort === "price") {
            tablets = tablets.sort((a, b) => a.price - b.price);
        }

        if (this.state.filter) {
            tablets = tablets.filter((tablet) => tablet.name.toLowerCase().includes(this.state.filter.toLowerCase()));
        }

        return (
            <React.Fragment>
                <Nav extra={
                    <React.Fragment>
                        <Menu.Item className="extraPadding" />
                        <Menu.Item className="extraInput">
                            <Input placeholder='Filter...'
                                   onChange={(ev, {value}) => this.setState({filter: value})}
                                   value={this.state.filter}
                                   transparent
                                   icon="search"/>
                        </Menu.Item>
                    </React.Fragment>
                }/>
                <div className="content">
                    <div className="cardList">
                        {tablets.map(tablet => <Tablet data={tablet} key={tablet.id}/>)}
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

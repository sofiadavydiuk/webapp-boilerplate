import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Icon, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";


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
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });

    }

    render() {
        let tvs = this.state.tvs;

        if (this.state.sort === "price") {
            tvs = tvs.sort((a, b) => a.price - b.price);
        }

        if (this.state.filter) {
            tvs = tvs.filter((tv) => tv.name.toLowerCase().includes(this.state.filter.toLowerCase()));
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
                        {tvs.map(tv => <Tvs data={tv} key={tv.id}/>)}
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


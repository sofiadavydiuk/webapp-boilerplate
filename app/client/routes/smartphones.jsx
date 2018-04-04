import React from 'react'
import {fetchInitialData, getInitialData} from "../helpers/initialData";
import {Card, Icon, Image, Input, Menu} from "semantic-ui-react";
import Nav from "../components/Nav";
import qs from "query-string";
import isNode from 'detect-node';
import requestJSON from "../helpers/requestJSON";
import Pagination from "../components/Pagination";

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
                Matthew is a musician living in Nashville.
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
            page: isNode ? 0 : parseInt(qs.parse(location.search).page) || 0,
            ...getInitialData(),
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    async onPageChange(activePage){
        console.log(activePage);
        this.setState({
            page: activePage,
        });
        const search = qs.parse(location.search);
        search.page = activePage;
        if (history.pushState) {
            const newurl = location.protocol + "//" + location.host + location.pathname + "?" + qs.stringify(search);
            window.history.pushState({path:newurl},'',newurl);
        }
        this.setState({
            ...(await requestJSON({})),
        });
    }

    async componentDidMount() {
        this.setState({
            ...(await fetchInitialData()),
        });
    }

    render() {
        let smartphones = this.state.smartphones;

        if (this.state.sort === "price") {
            smartphones = smartphones.sort((a, b) => a.price - b.price);
        }

        if (this.state.filter) {
            smartphones = smartphones.filter((smartphone) => smartphone.name.toLowerCase().includes(this.state.filter.toLowerCase()));
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
                        {smartphones.map(smartphone => <SmartPhone data={smartphone} key={smartphone.id}/>)}
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                        <div className="placeholder"/>
                    </div>
                    <Pagination activePage={this.state.page} pageCount={this.state.pageCount} onPageChange={this.onPageChange}/>
                </div>
            </React.Fragment>
        )
    }

}


import React from "react";
import qs from "query-string";
import isNode from "detect-node";
import Pagination from "./Pagination";


export default class ItemCollection extends React.Component {

    constructor() {
        super();

        this.state = {
            page: isNode ? 0 : parseInt(qs.parse(location.search).page) || 0,
        };

        this.onPageChange = this.onPageChange.bind(this);
    }

    async onPageChange(activePage) {
        this.setState({
            page: activePage,
        });
        if (history.pushState) {
            const search = qs.parse(location.search);
            search.page = activePage;
            const newurl = location.protocol + "//" + location.host + location.pathname + "?" + qs.stringify(search);
            window.history.pushState({path: newurl}, '', newurl);
        }
        this.props.onPageChange(activePage);
    }

    render() {
        const {items, ItemComponent, pageCount} = this.props;

        return (
            <div className="ItemCollection">
                <div className="cardList">
                    {items.map(item => <ItemComponent data={item} key={item.id}/>)}
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                    <div className="placeholder"/>
                </div>
                <Pagination activePage={this.state.page} pageCount={pageCount}
                            onPageChange={this.onPageChange}/>
            </div>
        );
    }
}


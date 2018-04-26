import React from 'react'
import {Route, Switch, withRouter} from "react-router";
import {getInitialData, setInitialData} from "./helpers/initialData";
import isNode from 'detect-node';
import Index from "./routes/index";
import Test from "./routes/test";
import Test2 from "./routes/test2";
import Footer from "./components/Footer";
import Products from "./routes/products";
import ErrorPage from "./routes/error";
import LoginControl from "./routes/LoginControl";

class App extends React.Component {
    constructor({initialData}) {
        super();

        if (isNode) {
            setInitialData(initialData);
        } else {
            setInitialData(JSON.parse(document.getElementById('initialData').textContent));
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen(() => {
            setInitialData(null);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    render() {

        if (getInitialData() && getInitialData()._error) {
            return (
                <React.Fragment>
                    <ErrorPage error={getInitialData()._error}/>
                    <Footer/>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/products" exact><Products key="products"/></Route>
                    <Route path="/smartphones" exact><Products key="smartphones"/></Route>
                    <Route path="/tablets" exact><Products key="tablets"/></Route>
                    <Route path="/tvs" exact><Products key="tvs"/></Route>
                    <Route path="/test" exact component={Test}/>
                    <Route path="/test2" exact component={Test2}/>
                    <Route path="/test3" exact component={LoginControl}/>
                    <ErrorPage error={{status: 404, message: "Not Found"}}/>
                </Switch>

                <Footer/>
            </React.Fragment>
        )
    }
}

export default withRouter(App);

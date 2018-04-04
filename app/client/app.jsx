import React from 'react'
import {Route, Switch, withRouter} from "react-router";
import {setInitialData} from "./helpers/initialData";
import isNode from 'detect-node';
import Index from "./routes/index";
import Smartphones from './routes/smartphones';
import Tablets from './routes/tablets';
import Tvs from './routes/tvs';
import Test from "./routes/test";
import Test2 from "./routes/test2";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

class App extends React.Component {
	constructor({initialData}) {
		super();

		if(isNode){
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
		return (
			<React.Fragment>
				<Switch>
					<Route path="/" exact component={Index}/>
					<Route path="/smartphones" exact component={Smartphones}/>
					<Route path="/tablets" exact component={Tablets}/>
					<Route path="/tvs" exact component={Tvs}/>
					<Route path="/test" exact component={Test}/>
					<Route path="/test2" exact component={Test2}/>
				</Switch>
                <Footer/>
			</React.Fragment>
		)
	}
}

export default withRouter(App);

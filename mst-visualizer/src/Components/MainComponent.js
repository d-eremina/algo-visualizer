import React, {Component} from 'react';
import Algo from "./AlgoComponent";
import Header from "./HeaderComponent";
import Contact from "./ContactComponent";
import Info from "./InfoComponent";
import {Switch, Route, Redirect} from "react-router-dom";

class Main extends Component {
    render() {
        const AlgoPage = () => {
            return (
                <Algo/>
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={AlgoPage}/>
                    <Route path="/contacts" component={Contact}/>
                    <Route path="/info" component={Info}/>
                    <Redirect to="/home"/>
                </Switch>
            </div>
        );
    }
}

export default Main;
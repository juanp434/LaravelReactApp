import React, { Component } from 'react'
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Header from './Header'
import Producto from './Producto'
import Wallet from './Wallet'
import NotFound from './NotFound'

export default class App extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return (
            <Router>
                <div>
                    <Header />
                    
                    <Switch>
                        <Route path='/product'>
                            <Producto/>
                        </Route>
                        <Route path='/wallet'>
                            <Wallet/>
                        </Route>
                        <Route exact path='/'> Esta es la pag inicio </Route>
                        <Route component={NotFound} />
                    </Switch>
                    
                </div>
            </Router>
        )
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
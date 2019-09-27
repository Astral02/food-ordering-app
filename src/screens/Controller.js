import React, { Component } from 'react';
import Home from './home/Home';
import Details from './details/Details';
import Checkout from './checkout/Checkout';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Profile from './profile/Profile';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = 'http://localhost:8080/api/';
    }

    render() {
        return (
            <Router>
                <div className='main-container'>
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route path='/restaurant/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
                    {/* Redirection to home page if a customer tries to go to the checkout page directly
                    */}
                    <Route path='/checkout' render={(props) => (
                        sessionStorage.getItem('customer-cart') === null ? (
                            <Redirect to='/' />
                        ) : (
                                <Checkout {...props} baseUrl={this.baseUrl} />
                            )
                    )} />
                    <Route path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;
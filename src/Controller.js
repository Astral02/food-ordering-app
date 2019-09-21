import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

class Controller extends Component{

    constructor()
    {
        super();
        this.baseUrl = "http://localhost:8080/api/swagger-ui.html#!/restaurant-controller/getAllRestaurantsUsingGET";
    }

render(){
    return(
        <Router>
            <div className="main-container">
                <Route exact path='/' render={(props) => <Home{...props} baseUrl = {this.baseUrl}/>} />
            </div>
        </Router>
    )
}
}

export default Controller;
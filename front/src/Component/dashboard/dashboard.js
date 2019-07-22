import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import UploadProduct from "./uploadProduct"
import Home from "../home"

export default class dashboard extends Component {
    renderRedirect = () => {
        if (!localStorage.getItem('token')) {
            this.props.history.push("/Login")
        }
    }
    render() {
        return (
            <div>
                <Router>
                    <div>
                        {this.renderRedirect()}
                        
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">

                                <li class="nav-item">
                                        <Link class="nav-link" to="/">Home</Link>
                                    </li>
                                    <li class="nav-item active">
                                        <Link class="nav-link" to="/Dashboard">Upload Product</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/users/">Command product</Link>
                                    </li>

                                </ul>
                            </div>
                        </nav>

                        <Route path="/Dashboard" exact component={UploadProduct} />
                        <Route path="/about/" exact component={UploadProduct} />
                        <Route path="/users/" exact component={UploadProduct} />
                        <Route path="/"exact  component={Home} />

                    </div>
                </Router>

            </div>
        )
    }
}






// <nav>
//     <ul>
//         <li>

//         </li>
//         <li>
//             <Link to="/about/">List of my Product</Link>
//         </li>
//         <li>
//             <Link to="/users/">command product</Link>
//         </li>
//         <li>
//             <Link to="/Home">Home</Link>
//         </li>
//     </ul>
// </nav>
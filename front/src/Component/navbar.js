import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'
import Login from "./login"
import Register from "./register"
import Home from "./home"
import Dash from "./dashboard/dashboard"
import Uploadproduct from "./dashboard/uploadProduct"
import Panier from "./panier"
import Myproduct from "./myproduct"


class navbar extends Component {
    componentDidMount() {
        console.log("avant", this.props.connecter);
        this._etatConnexion(localStorage.getItem("token"))
        console.log("apres", this.props);

    }


    deconnecte() {
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        console.log("decone", this.props.connecter);
        const action = { type: "DECONNECTE" }
        this.props.dispatch(action)


    }


    _etatConnexion(e) {
        const action = { type: "CONNECTER", value: e }
        this.props.dispatch(action)
    }
    render() {
        return (
            <div>

                <div className="bar">
                    {!this.props.connecter ? <div>
                        <Router>
                            <div>
                                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                    {/* <a class="navbar-brand" href="#">Navbar</a> */}
                                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                        <span class="navbar-toggler-icon"></span>
                                    </button>
                                    <div class="collapse navbar-collapse" id="navbarNav">
                                        <ul class="navbar-nav">
                                            <li class="nav-item active">
                                                <Link class="nav-link" to="/" >Home <span class="sr-only">(current)</span></Link>
                                            </li>
                                            <li class="nav-item">
                                                <Link class="nav-link " to="/panier">Panier</Link>
                                            </li>

                                            <li class="nav-item">
                                                <Link id="li" class="nav-link" to="/login">Sign in</Link>
                                            </li>
                                            <li class="nav-item">
                                                <Link class="nav-link" to="/register">Sign up</Link>
                                            </li>
                                        </ul>
                                    </div>


                                </nav>
                                <Route path="/" exact component={Home} />
                                <Route path="/panier" exact component={Panier} />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
                            </div>
                        </Router>

                    </div> : <div className="bar">
                            <Router>
                                <div>
                                    <nav class="navbar navbar-expand-lg navbar-light bg-light">

                                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse" id="navbarNav">
                                            <ul class="navbar-nav">
                                                <li class="nav-item">
                                                    <Link class="nav-link" to="/">Home</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link class="nav-link" to="/myproduct">My product</Link>
                                                </li>
                                                <li class="nav-item">
                                                    <Link class="nav-link" to="/paniers">Panier</Link>
                                                </li>
                                                <li class="nav-item ">
                                                    <Link class="nav-link" to="/Dashboard">Upload Product</Link>
                                                </li>
                                                <li class="nav-item ">
                                                    <Link class="nav-link" to="/" onClick={
                                                        () => {
                                                            this.deconnecte()
                                                        }
                                                    } >deconnecte</Link>
                                                </li>



                                            </ul>
                                        </div>
                                    </nav>
                                    <Route path="/paniers" exact component={Panier} />
                                    <Route path="/Dashboard" exact component={Uploadproduct} />
                                    <Route path="/myproduct" exact component={Myproduct} />
                                    <Route path="/" exact component={Home} />
                                </div>
                            </Router>
                        </div>}






                </div>





            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        connecter: state.connecter
    }
}
export default connect(mapStateToProps)(navbar)
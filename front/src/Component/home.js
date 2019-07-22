import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import "./home.css"
import UploadProduct from "./dashboard/uploadProduct"
import Home from "./home"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'

class home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product: "",
            url: ""
        }
    }


    getAll() {
        axios.get("http://localhost:8080/backGetAll")
            .then(res => {
                this.setState({
                    product: res.data

                })
                console.log(res.data);

            }).catch(err => {
                console.log(err);

            })
    }
   
    componentDidMount() {
        this.getAll()
    }


    _ajoutPanier(e,f) {
        const action = { type: "PANIER", value: e }
        this.props.dispatch(action)
        document.getElementById(f).innerHTML="     ok"
    }

    render() {
        return (
            <div>

                <div class="container">

                    {this.state.product.length > 0 ? <div className="row">
                        {this.state.product.map((prod) => {
                            var d = "http://localhost:8080/image/" + prod.img1
                            var e = "http://localhost:8080/image/" + prod.img2
                            var f = "http://localhost:8080/image/" + prod.img3
                            return (
                                <div class="card" class="r">
                                    <img class="card-img-top" src={d} alt="Card image cap" />

                                    <div class="card-body">
                                        
                                        <h2 class="card-title">{prod.titre}</h2>
                                        <p class="card-text">{prod.description}</p>
                                        <p class="card-text">{prod.prix} $</p>
                                        <button class="btn btn-primary" onClick={
                                            (e) => {
                                                e.preventDefault()
                                                this._ajoutPanier(prod,prod._id)
                                                console.log("voici prod ajout pan",prod);

                                            }
                                        }>Ajouter panier</button>
                                        <e id={prod._id}></e>
                                    </div>

                                </div>
                            )
                        })}
                    </div> : ""}





                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        panier: state.panier
    }
}
export default connect(mapStateToProps)(home)

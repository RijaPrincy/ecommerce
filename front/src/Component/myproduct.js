import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


class myproduct extends Component {


    constructor(props) {
        super(props);

        this.state = {
            product: "",
        }
    }
    componentDidMount() {
        this.getOne()
    }

    getOne() {
        axios.get("http://localhost:8080/backMyprod/" + localStorage.getItem("id"))
            .then(res => {
                this.setState({
                    product: res.data

                })
                console.log(res.data);

            }).catch(err => {
                console.log(err);

            })
    }



    render() {
        return (
            <div class="container">
                <h2>Tous mes produits</h2>

                <div class="container">

                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Produit</th>
                                <th>Description</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.product.length > 0 ? this.state.product.map((pan) => {
                                var d = "http://localhost:8080/image/" + pan.img1
                                return <tr>
                                    <td><img src={d} width="50px" /></td>
                                    <td>{pan.titre}</td>
                                    <td>{pan.description}</td>
                                    <td>{pan.prix} $</td>
                                </tr>

                            }) : ""}

                        </tbody>
                    </table>
                    
                </div>
            </div>
        )
    }
}



export default  myproduct


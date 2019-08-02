import React, { Component } from 'react'
import { connect } from 'react-redux'
import paypal from 'paypal-rest-sdk';
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button'




class panier extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total: ""

        }


    }






    componentDidMount() {



        console.log("props panier", this.props.panier);
        this.totale()

    }

    totale() {
        let a = 0
        for (let i = 0; i < this.props.panier.length; i++) {
            a = a + parseInt(this.props.panier[i].prix)
        }
        this.setState({
            total: a
        })
    }

    supprimer(e) {
        const action = { type: "SUPPRPANIER", value: e }
        this.props.dispatch(action)
        this.totale()
    }
    render() {
        return (
            <div>
                <div class="container">
                    <h2>Liste des achats que vous avez effectuer</h2>

                    <div class="container">

                        <table class="table table-dark">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Produit</th>
                                    <th>Prix</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.panier.length > 0 ? this.props.panier.map((pan, index) => {
                                    var d = "http://localhost:8080/image/" + pan.img1


                                    return <tr>
                                        <td><img src={d} width="50px" /></td>
                                        <td>{pan.titre}</td>
                                        <td>{pan.prix} $</td>
                                        <td><button className="btn btn-danger" onClick={() => {
                                            this.supprimer(index)
                                        }}>X</button></td>
                                    </tr>

                                }) : ""}

                            </tbody>
                        </table>
                        <div>TOTAL A PAYER: {this.state.total} $</div>
                        {/* <button class="btn btn-primary" onClick={() => {
                            this.paypalCheckOut()
                        }}>Payer Paypal</button> */}
                        <PayPalButton
                            env='sandbox'
                            sandboxID='AXk3_hzEV6oQGcvgIpdR-IjJIB2CaiAF1ID3eGBqt4G9Y8RZTHTNcDyJHpe7j8XmYkmz4wiciM1laSz9'
                            amount={this.state.total}
                            currency='USD'
                            onPaymentStart={() => console.log('payment started')}
                            onPaymentSuccess={(res) => console.log('payment complete', res)}
                            onPaymentError={(msg) => {
                                 document.getElementById("ha").innerHTML="erreur";
                                console.log('payment error', msg)}
                            }
                                
                            onShippingChange={(data) => {
                                console.log('onShippingChange', data)
                                // run code to calculate and update your shipping charges
                                // this callback will also work as an async function
                                // you can optionally return a number representing the new shipping amount
                                return 1.00
                            }}

                          
                        />
                    </div>
                    <div id="ha"></div>
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
export default connect(mapStateToProps)(panier)







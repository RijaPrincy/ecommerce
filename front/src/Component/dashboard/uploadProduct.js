import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";

export default class uploadProduct extends Component {



    constructor(props) {
        super(props);

        this.state = {
            titre: '',
            description: "",
            prix: ""

        }
        this.change = this.change.bind(this)

    }


    setAuthToken(token) {
        if (token) {
            console.log("if token");

            var t = "bearer " + token
            console.log(t);

            axios.defaults.headers.common['authorization'] = t
        } else {
            console.log("else token");
            delete axios.defaults.headers.common['authorization'];


        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleUploadImage(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('file0', this.uploadInput.files[0]);
        data.append('file1', this.uploadInput0.files[0]);
        data.append('file2', this.uploadInput1.files[0]);
        data.append('titre', this.state.titre);
        data.append('description', this.state.description)
        data.append('idPoster', localStorage.getItem('id'))

        data.append('prix', this.state.prix)


        axios.post('http://localhost:8080/backPostProduct', data, this.setAuthToken(localStorage.getItem('token')))
            .then(result => {
                console.log("result", result);
                document.getElementById("reussi").innerHTML="reussi"
            }
            )
            .catch(result => {
                document.getElementById("non").innerHTML="non reussi"
                console.log("erreur", result);

            });

    }



    renderRedirect = () => {
        if (localStorage.getItem('token')) {
            return <Redirect to='/Dashboard' />
        }
    }




    render() {
        return (
            <div>

                <div id="login">
                    <h3 class="text-center text-white pt-5">Login form</h3>
                    <div class="container">
                        <div id="login-row" class="row justify-content-center align-items-center">
                            <div id="login-column" class="col-md-6">
                                <div id="login-box" class="col-md-12">
                                    <form id="login-form" class="form" action="" method="post">
                                        <h3 class="text-center text-info">Produit</h3>
                                        <div class="form-group">
                                            <label for="username" class="text-info">Titre:</label><br />

                                            {/* input titre */}
                                            <input type="text" name="titre" value={this.state.titre} onChange={this.change} id="username" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="text-info">Description:</label><br />
                                            {/* input description */}

                                            <input type="text" name="description" value={this.state.description} onChange={this.change} id="password" class="form-control" />
                                        </div>

                                        <div class="form-group">
                                            <label for="password" class="text-info">Prix:</label><br />
                                            {/* input prix */}

                                            <input type="text" name="prix" value={this.state.prix} onChange={this.change} id="password" class="form-control" />
                                        </div>

                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                            </div>
                                            <div class="custom-file">

                                                <input

                                                    class="custom-file-input" id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01"
                                                    ref={(ref) => { this.uploadInput = ref; }} type="file" class="form-control" id="inputCity" />
                                                {/* <label class="custom-file-label" for="inputGroupFile01">Choose file</label> */}
                                            </div>
                                        </div>
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                            </div>
                                            <div class="custom-file">

                                                <input ref={(ref) => { this.uploadInput0 = ref; }} type="file" class="form-control" id="inputCity" />
                                                {/* <label class="custom-file-label" for="inputGroupFile01">Choose file</label> */}
                                            </div>
                                        </div>

                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                            </div>
                                            <div class="custom-file">


                            
                                                <input ref={(ref) => { this.uploadInput1 = ref; }} type="file" class="form-control" id="inputCity" />
                                                {/* <label class="custom-file-label" for="inputGroupFile01">Choose file</label> */}
                                            </div>
                                        </div>




                                        <div class="form-group">

                                            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"
                                                onClick={
                                                    this.handleUploadImage.bind(this)} />


                                        </div>
                                        <div id="reussi"></div>
                                        <div id="non"></div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}





{/* <input ref={(ref) => { this.uploadInput = ref; }} type="file" class="form-control" id="inputCity" /> */ }







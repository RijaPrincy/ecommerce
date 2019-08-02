import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Redirect } from "react-router-dom";


class get extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            passWord: "",
            redirect: ""

        }
        this.change = this.change.bind(this)

    }
    componentDidMount() {
        this.renderRedirect1()
    }


    renderRedirect1 = () => {
        if (localStorage.getItem('token')) {
            this.props.history.push("/Dashboard")    
            // return <Redirect to='/Dashboard' />
        }
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            // return <Redirect to='/Dashboard' />
            this.props.history.push("/Dashboard")
        }
    }
    redirect() {
        console.log("hahah");
        
        this.setState({
            redirect: true
        })

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
    login = (e) => {
        axios.post('http://localhost:8080/backLogin', e)
            .then(result => {
                if (result.data == "not ok") {
                    console.log("erreur mdp");
                    document.getElementById("err").innerHTML="erreuur mdp ou email"
                } else {
                    console.log("result", result.data);
                    var token = result.data.token
                    localStorage.setItem('token', token)
                    localStorage.setItem('id', result.data.note0._id)
                    this.redirect()
                    this._etatConnexion(localStorage.getItem('token'))
                }


            }
            )
            .catch(result => {
                console.log("erreur", result);
                document.getElementById("err").innerHTML="erreuur mdp ou email"

            });
    }



    _etatConnexion(e) {
        const action = { type: "CONNECTER", value: e }
        this.props.dispatch(action)
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div >
                    <div id="login">
                        <h3 class="text-center text-white pt-5">Login form</h3>
                        <div class="container">
                            <div id="login-row" class="row justify-content-center align-items-center">
                                <div id="login-column" class="col-md-6">
                                    <div id="login-box" class="col-md-12">
                                        <form id="login-form" class="form" action="" method="post">
                                            <h3 class="text-center text-info">Login</h3>
                                            <div class="form-group">
                                                <label for="username" class="text-info">Username:</label><br />
                                                <input type="text" name="email" value={this.state.email} onChange={this.change} id="username" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                <label for="password" class="text-info">Password:</label><br />
                                                <input type="password" name="passWord" value={this.state.passWord} onChange={this.change} id="password" class="form-control" />
                                            </div>
                                            <div class="form-group">
                                                
                                                <input type="submit" name="submit" class="btn btn-info btn-md" value="submit"
                                                    onClick={
                                                        (e) => {
                                                            e.preventDefault()
                                                            this.login({
                                                                email: this.state.email,
                                                                passWord: this.state.passWord
                                                            })
                                                        }
                                                    } />
                                            </div>
                                            <div id="err">
                                               
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
export default connect(mapStateToProps)(get)






{/* <form>
                    {this.renderRedirect()}
                    <div>
                        <input name="email" value={this.state.email} onChange={this.change} className="email" />
                    </div>
                    <div>
                        <input name="passWord" value={this.state.passWord} onChange={this.change} className="passWord" />
                    </div>
                    <button onClick={
                        (e) => {
                            e.preventDefault()
                            this.login({
                                email: this.state.email,
                                passWord: this.state.passWord
                            })
                        }
                    }>HAHAHAs</button>
                </form> */}

               
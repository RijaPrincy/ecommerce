import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Store from './Store/store'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Component/login'
import Home from './Component/home'
import Register from './Component/register'
import Dashboard from './Component/dashboard/dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Component/navbar'
import Payp from './Component/payp'
import PayG from './Component/paypsucc'



// import Login from "./login"
// import Register from "./register"
// import Home from "./home"
import Dash from "./Component/dashboard/dashboard"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: ""
    }
  }
  componentDidMount() {
   
  }
  
  render() {
    return (
      <div className="app">

        <Provider store={Store}>

          <Router>
            <div>
              
              <Route path="/" exact component={Nav} />
              
              <Route path="/login" component={Nav} />
              <Route path="/register" component={Nav} />
              <Route path="/decon" component={Nav} />

              <Route path="/myproduct" component={Nav} />
              <Route path="/paniers" component={Nav} />
              <Route path="/panier" component={Nav} />
              <Route path="/Dashboard" component={Nav} />


              <Route path="/Payp" component={Payp} />
              <Route path="/Dashboard" component={Nav} />

            </div>

          </Router>
        </Provider>
      </div>
    )
  }
}
export default App;

{/* <Provider store={Store}>
          <Router>
            <div>
              <Route path="/navbar" component={Nav} />
              <Route path="/login" exact component={Login} />
              <Route path="/Home" exact component={Home} />
              <Route path="/Register" component={Register} />
              <Route path="/Dashboard" component={Dashboard} />

            </div>

          </Router>


        </Provider> */}
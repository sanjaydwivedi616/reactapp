import React from "react";
import { Switch, Route, } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostDetails from "./component/UserPostDetails";
import PageNotFound from "./component/Page-Not-Found";
import Users from "./component/Users";
import Product from "./component/Product";
import CovideIndiaCase from "./component/CovideIndiaCase"
import Login from "./component/Login";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/Users" component={Users}></Route>
        <Route exact path="/UserPostDetails" component={UserPostDetails}></Route>
        <Route exact path="/Product" component={Product}></Route>
        <Route exact path="/CovideIndiaCase" component={CovideIndiaCase}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;

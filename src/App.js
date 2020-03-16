import React from "react";
import { Switch, Route, } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPostDetails from "./component/UserPostDetails";
import PageNotFound from "./component/Page-Not-Found";
import users from "./component/Users";
import Product from "./component/Product";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route exact path="/" component={users}></Route>
        <Route path="/UserPostDetails" component={UserPostDetails}></Route>
        <Route path="/Product" component={Product}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;

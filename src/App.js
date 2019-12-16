import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./component/Product-list";
import ProductDetails from "./component/Product-details";
import Cart from "./component/Cart";
import PageNotFound from "./component/Page-Not-Found";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route exact path="/" component={ProductList}></Route>
        <Route path="/ProductDetails" component={ProductDetails}></Route>
        <Route path="/Cart" component={Cart}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;

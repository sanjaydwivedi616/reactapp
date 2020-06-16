import React from "react";
import { Switch, Route, } from "react-router-dom";
import UserPostDetails from "./component/UserPostDetails";
import PageNotFound from "./component/Page-Not-Found";
import Users from "./component/Users";
import Product from "./component/Product";
import CovideIndiaCase from "./component/CovideIndiaCase"
import Login from "./component/Login";
import Movie_info from "./component/Movie_info";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/Users" component={Users}></Route>
      <Route exact path="/UserPostDetails" component={UserPostDetails}></Route>
      <Route exact path="/Product" component={Product}></Route>
      <Route exact path="/CovideIndiaCase" component={CovideIndiaCase}></Route>
      <Route exact path="/Movie_info" component={Movie_info}></Route>
      <Route component={PageNotFound}></Route>
    </Switch>
  )
}

export default React.memo(Router);
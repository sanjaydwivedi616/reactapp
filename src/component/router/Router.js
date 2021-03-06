import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading";
import AddUser from "../users/AddUser";

import { USER_LOGOUT_REQUEST } from "../../redux/login/loginType"
const Users = lazy(() => import("../users/Users"));
const CovideIndiaCase = lazy(() => import("../covid_cases_india/CovideIndiaCase"));
const Userpost = lazy(() => import("../posts/Userpost"));
const Login = lazy(() => import("../Login"));
const Product = lazy(() => import("../Product"));
const PageNotFound = lazy(() => import("../Page-Not-Found"));



class Router extends Component {
  UNSAFE_componentWillMount() {
    if (localStorage.getItem('userLoginToken')) {
      this.props.userLoginStatusTrue();
    }
  }

  render() {
    let LoginData = localStorage.getItem("userLoginToken");
    return (
      <Suspense fallback={<Loading />}>
        {
          LoginData ?
            <Switch>
              <Route exact path="/user-list" component={Users}></Route>
              <Route exact path="/user-post" component={Userpost}></Route>
              <Route exact path="/product" component={Product}></Route>
              <Route exact path="/covide-cases-india" component={CovideIndiaCase}></Route>
              <Route component={PageNotFound} ></Route >
            </Switch>
            :
            <Switch>
              <Route exact path="/" component={Login}></Route>
              <Route exact path="/add-new-user" component={AddUser}></Route>
              <Route component={PageNotFound} ></Route>
            </Switch>
        }

      </Suspense >
    )
  }
}

const mapStateToProps = state => {
  return {
    userLoginState: state.login
  }
}
const mapDispatchToProps = dispatch => {
  return {
    userLoginStatusTrue: () => dispatch({ type: USER_LOGOUT_REQUEST })
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Router);
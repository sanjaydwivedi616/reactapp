import React, { Component } from "react";
import { Switch, Route, } from "react-router-dom";
import UserPostDetails from "../posts/UserPostDetails";
import PageNotFound from "../Page-Not-Found";
import Users from "../users/Users";
import Product from "../Product";
import CovideIndiaCase from "../covid_cases_india/CovideIndiaCase"
import Login from "../Login";
import { connect } from "react-redux"

class Router extends Component {
  UNSAFE_componentWillMount() {
    if (localStorage.getItem('userLoginToken')) {
      this.props.userLoginStatusTrue();
    }
  }

  render() {

    return (
      <Switch>
        {
          this.props.userLoginState.login ?
            <>
              <Route exact path="/Users" component={Users}></Route>
              <Route exact path="/UserPostDetails" component={UserPostDetails}></Route>
              <Route exact path="/Product" component={Product}></Route>
              <Route exact path="/CovideIndiaCase" component={CovideIndiaCase}></Route>

            </>
            :
            <Route exact path="/" component={Login}></Route>
        }
        < Route component={PageNotFound} ></Route >
      </Switch >
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
    userLoginStatusTrue: () => dispatch({ type: 'userLogdin' })
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Router);
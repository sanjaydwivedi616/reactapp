import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from "redux";
import allReducers from "./component/store/reducer"
import thunk from "redux-thunk";

const stores = createStore(
  allReducers,
  compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


ReactDOM.render(
  <Provider store={stores}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById("root")
);
serviceWorker.unregister();

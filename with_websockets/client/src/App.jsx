import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router";

import { store, history } from "./store";
import logo from "./logo.svg";
import "./App.css";
import Customers from "./containers/customers";
import SocketTest from "./components/socket_test";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">React/Redux Express Starter</h1>
          </header>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={Customers} />
              <Route exact path="/socket" component={SocketTest} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

export default App;

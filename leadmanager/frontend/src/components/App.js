import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layers/Header";
import DashBoard from "./leads/DashBoard";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className="container"></div>
          <DashBoard />
        </Fragment>
      </Provider>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));

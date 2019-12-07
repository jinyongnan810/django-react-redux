import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./layers/Header";
import DashBoard from "./leads/DashBoard";
class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container"></div>
        <DashBoard />
      </Fragment>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));

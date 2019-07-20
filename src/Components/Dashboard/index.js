import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="background">
        <div className="d-flex flex-row justify-content-center pt-5">
          <span className="dashboard-title">
            Qual ação você deseja pesquisar?
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center pt-5">
          <div className="col-12 col-md-4">
            <input placeholder="ex: aapl" type="text" className="text-input" />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center pt-5">
          <div className="col-12 col-md-2">
            <button className="search-button">Pesquisar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

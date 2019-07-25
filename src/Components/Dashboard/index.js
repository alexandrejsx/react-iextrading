import React, { Component, Fragment } from "react";
import requestApi from "../../Api/request";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    amt: 2100
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      loading: false,
      companyData: false,
      searchText: "",
      error: false,
      latestPrice: {},
      companyInfo: {},
      companyLogo: ""
    };
  }

  searchAction = async () => {
    const { searchText } = this.state;

    this.setState({ loading: true, error: false });

    try {
      const { data } = await requestApi(`getDataBySymbol`, {
        symbol: searchText
      });
      let success = false;
      let error = false;

      if (
        data.latestPrice &&
        data.latestPrice.success &&
        data.companyInfo &&
        data.companyInfo.success &&
        data.companyLogo &&
        data.companyLogo.success
      ) {
        this.setState({
          latestPrice: data.latestPrice.data,
          companyInfo: data.companyInfo.data,
          companyLogo: data.companyLogo.data
        });
        success = true;
      } else {
        error = true;
      }

      this.setState({ loading: false, success, error });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
    this.setState({ companyData: !this.state.companyData });
  };

  renderRealTimeStatus() {
    return (
      <div className="d-flex flex-row trade-status">
        <span className="trade-text">+2323 Dols</span>
      </div>
    );
  }

  handleSearch = e => {
    const { value } = e.target;

    this.setState({ searchText: value });
  };

  renderCompanyInfo() {
    const { companyInfo, companyLogo, latestPrice } = this.state;
    console.log("companyInfo", companyInfo, latestPrice);
    return (
      <div className="fade-in col-12 col-lg-6">
        <div className="main-card">
          <div className="bottom-line w-100 d-flex flex-row flex-wrap justify-content-between px-3 pb-3">
            <div className="d-flex flex-row col-12 col-md-6 col-lg-5">
              <img alt="" src={companyLogo.url} className="logo-img" />
              <div className="container-info ml-3">
                <span className="company-name">{companyInfo.companyName}</span>
              </div>
            </div>
            <div className="container-info text-center col-md-3 col-lg-4">
              <span className="action-value">
                {latestPrice.latestPrice} USD
              </span>
            </div>
            <div className="container-info text-center col-md-3 col-lg-3">
              <span
                className={`action-growth ${
                  latestPrice.change > 0 ? "up" : "down"
                }`}
              >
                {latestPrice.change} ({latestPrice.changePercent}%)
              </span>
            </div>
          </div>
          <div className="bottom-line d-flex flex-row flex-wrap px-3 pb-3 mt-3 mt-3">
            <div className="col-6 col-lg-4 mb-2">
              <div className="container-info">
                <span className="info-label">CEO</span>
                <span className="info-value">{companyInfo["CEO"]}</span>
              </div>
            </div>
            <div className="col-6 col-lg-4 mb-2">
              <div className="container-info">
                <span className="info-label">Atividade</span>
                <span className="info-value">{companyInfo.industry}</span>
              </div>
            </div>
            <div className="col-6 col-lg-4 mb-2">
              <div className="container-info">
                <span className="info-label">Setor</span>
                <span className="info-value">{companyInfo.sector}</span>
              </div>
            </div>
            <div className="col-6 col-lg-4 mb-2">
              <div className="container-info">
                <span className="info-label">Site</span>
                <span className="info-value">{companyInfo.website}</span>
              </div>
            </div>
            <div className="col-6 col-lg-4 mb-2">
              <div className="container-info">
                <span className="info-label">Simbolo</span>
                <span className="info-value">{companyInfo.symbol}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex flex-row flex-wrap justify-content-between px-3 pb-3">
            <div className="col-12">
              <div className="container-info">
                <span className="info-label">Descrição</span>
                <span className="info-value">{companyInfo.description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderActionInfo() {
    return (
      <div className="fade-in col-12 col-lg-6">
        <div className="main-card">
          <div className="d-flex flex-row flex-wrap justify-content-center">
            <div className="col-12 col-md-4 margin-bottom-sm">
              <button className="button-range selected">DIA</button>
            </div>
            <div className="col-12 col-md-4 margin-bottom-sm">
              <button className="button-range">MÊS</button>
            </div>
            <div className="col-12 col-md-4 margin-bottom-sm">
              <button className="button-range">ANO</button>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#35b127" />
            </LineChart>
          </div>
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }

  renderMessageError() {
    return (
      <div className="d-flex justify-content-center w-100 mt-5">
        <span className="error-msg">
          Ops. Ocorreu algum erro. Por favor, verifique a sigla digitada e tente
          novamente!
        </span>
      </div>
    );
  }

  render() {
    const { loading, success, error } = this.state;

    return (
      <Fragment>
        <div className="d-flex flex-row justify-content-center pt-4">
          <span className="dashboard-title">
            Qual ação você deseja pesquisar?
          </span>
        </div>
        <div className="d-flex flex-row justify-content-center pt-3">
          <div className="col-12 col-md-4">
            <input
              onChange={e => this.handleSearch(e)}
              placeholder="ex: aapl"
              type="text"
              className="text-input"
            />
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center pt-3">
          <div className="col-12 col-md-2">
            <button
              onClick={() => this.searchAction()}
              className="search-button"
            >
              Pesquisar
            </button>
          </div>
        </div>
        {!loading && success && this.renderRealTimeStatus()}
        <div className="col-12">
          <div className="row">
            {!loading && success && this.renderCompanyInfo()}
            {!loading && success && this.renderActionInfo()}
            {loading && this.renderLoading()}
            {error && this.renderMessageError()}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;

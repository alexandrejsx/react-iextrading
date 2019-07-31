import React, { Component, Fragment } from "react";
import requestApi from "../../Api/request";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			success: false,
			successEarnings: false,
			loading: false,
			searchText: "",
			error: false,
			latestPrice: {},
			companyInfo: {},
			companyLogo: "",
			loadingEarnings: false,
			selectedChart: "",
			selectedChartData: [],
			chartDataDays: [],
			chartDataMonth: [],
		};
	}

	componentDidMount = () => {
		this.getTodayEarnings();
	};

	getTodayEarnings = async () => {
		try {
			this.setState({ loadingEarnings: true });
			const { data } = await requestApi(`/general/getTodayEarnings`, {});

			if (data && data.todayEarnings) {
				this.setState({
					todayEarnings: data.todayEarnings.data,
					loadingEarnings: false,
					successEarnings: true,
				});
			} else {
				this.setState({ loadingEarnings: false, successEarnings: false });
			}
		} catch (error) {
			this.setState({ error: error.message, loadingEarnings: false, successEarnings: false });
		}
	};

	searchAction = async () => {
		const { searchText } = this.state;

		this.setState({ loading: true, error: false });

		try {
			const { data } = await requestApi(`/general/getDataBySymbol`, {
				symbol: searchText,
			});

			if (
				data.latestPrice.success &&
				data.companyInfo.success &&
				data.companyLogo.success &&
				data.chartDataDays.success &&
				data.chartDataMonth.success
			) {
				this.setState({
					latestPrice: data.latestPrice.data,
					companyInfo: data.companyInfo.data,
					companyLogo: data.companyLogo.data,
					chartDataDays: data.chartDataDays.data,
					chartDataMonth: data.chartDataMonth.data,
					selectedChartData: data.chartDataDays.data,
					selectedChart: "days",
					loading: false,
					success: true,
				});
			} else {
				this.setState({ error: true, loading: false });
			}
		} catch (error) {
			this.setState({ loading: false, error: error.message });
		}
	};

	handleSelectedChart = selected => {
		const { chartDataDays, chartDataMonth } = this.state;
		let selectedChartData = [];

		if (selected === "days") {
			selectedChartData = chartDataDays;
		} else if (selected === "month") {
			selectedChartData = chartDataMonth;
		}

		this.setState({ selectedChart: selected, selectedChartData });
	};

	handleSearch = e => {
		const { value } = e.target;

		this.setState({ searchText: value });
	};

	renderCompanyInfo() {
		const { companyInfo, companyLogo, latestPrice } = this.state;

		return (
			<div className="fade-in col-12 col-lg-6 margin-bottom-sm">
				<div className="main-card">
					<div className="bottom-line w-100 d-flex flex-row flex-wrap justify-content-between px-3 pb-3">
						<div className="d-flex flex-row col-12 col-md-6 col-lg-5">
							<img alt="" src={companyLogo.url} className="logo-img" />
							<div className="container-info ml-3">
								<span className="company-name">{companyInfo.companyName}</span>
							</div>
						</div>
						<div className="container-info text-center col-md-3 col-lg-4">
							<span className="action-value">{latestPrice.latestPrice} USD</span>
						</div>
						<div className="container-info text-center col-md-3 col-lg-3">
							<span className={`action-growth ${latestPrice.change > 0 ? "up" : "down"}`}>
								{latestPrice.change > 0 ? (
									<i className="fas fa-sort-up mr-2" />
								) : (
									<i className="fas fa-sort-down mr-2" />
								)}
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
		const { selectedChart, selectedChartData } = this.state;

		return (
			<div className="fade-in col-12 col-lg-6">
				<div className="main-card">
					<div className="d-flex flex-row justify-content-center">
						<div className="col-12 col-lg-8 d-flex flex-row flex-wrap justify-content-center">
							<div className="col-12 col-md-4 margin-bottom-sm">
								<button
									onClick={() => this.handleSelectedChart("days")}
									className={`button-range ${selectedChart === "days" ? "selected" : ""}`}>
									5 DIAS
								</button>
							</div>
							<div className="col-12 col-md-4 margin-bottom-sm">
								<button
									onClick={() => this.handleSelectedChart("month")}
									className={`button-range ${selectedChart === "month" ? "selected" : ""}`}>
									MÊS
								</button>
							</div>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<LineChart
							width={600}
							height={300}
							data={selectedChartData}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="label" domain={["auto", "auto"]} />
							<YAxis type="number" domain={["auto", "auto"]} />
							<Tooltip verticalAlign="top" />
							<Line type="monotone" dataKey="high" stroke="#35b127" />
						</LineChart>
					</div>
				</div>
			</div>
		);
	}

	renderTodayEarnings() {
		const { todayEarnings } = this.state;

		return (
			<div className="d-flex flex-row trade-status">
				<div className="d-flex flex-row">
					{todayEarnings &&
						todayEarnings.map((earning, key) => {
							const { quote } = earning;
							return (
								<div key={key} className="earning-value">
									{quote.companyName}
									<span className={`mx-2 action-growth ${quote.change > 0 ? "up" : "down"}`}>
										<span className={`latest-price  ${quote.change > 0 ? "up" : "down"}`}>
											{quote.latestPrice} USD
										</span>
										{quote.change > 0 ? (
											<i className="fas fa-sort-up mx-2" />
										) : (
											<i className="fas fa-sort-down mx-2" />
										)}
										{quote.change} ({quote.changePercent}%)
									</span>
								</div>
							);
						})}
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
					Ops. Ocorreu algum erro. Por favor, verifique a sigla digitada e tente novamente!
				</span>
			</div>
		);
	}

	render() {
		const { loading, success, error, loadingEarnings, successEarnings } = this.state;

		return (
			<Fragment>
				<div className="d-flex flex-row justify-content-center pt-4">
					<span className="dashboard-title">Qual ação você deseja pesquisar?</span>
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
							disabled={loading}>
							Pesquisar
						</button>
					</div>
				</div>
				{!loadingEarnings && successEarnings && this.renderTodayEarnings()}
				<div className="col-12">
					<div className="row">
						{!loading && success && this.renderCompanyInfo()}
						{!loading && success && this.renderActionInfo()}
						{(loading || loadingEarnings) && this.renderLoading()}
						{error && this.renderMessageError()}
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Dashboard;

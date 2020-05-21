import React, { Component } from "react";
import symbols from "./data/symbols";
import $http from "axios";
import Tr from "./components/Tr";

class App extends Component {
	state = { filtredData: [] };
	componentDidMount() {
		sessionStorage.clear();
		this.getData();
	}
	getData = () => {
		$http.get("https://api.binance.com/api/v1/ticker/allPrices")
			.then(res => {
				const x = [];
				for (const allS of res.data) {
					for (const myS of symbols) {
						if (allS.symbol === myS) {
							x.push(allS);
							break;
						}
					}
				}
				this.setState({ filtredData: x });
				// this.setState({ filtredData: res.data });
			})
			.catch(err => {
				throw new Error(err);
			})
			.finally(() => {
				setTimeout(() => {
					this.getData();
				}, 5000);
			});
	};

	render() {
		return (
			<div>
				<table className="table table-striped table-dark">
					<thead>
						<tr>
							<th>symbol</th>
							<th>price</th>
							<th>idx</th>
						</tr>
					</thead>
					<tbody>
						{this.state.filtredData.map(
							(item, idx) => (
								<Tr
									key={
										item.symbol
									}
									trData={Object.assign(
										item,
										{
											idx: idx,
										}
									)}
								/>
							)
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;

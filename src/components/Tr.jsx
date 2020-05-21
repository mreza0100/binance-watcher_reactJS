import React, { Component } from "react";

class Tr extends Component {
	componentDidMount() {
		this.trElem = document.getElementById(this.props.trData.symbol);
	}
	updatingLastPrice = () => {
		sessionStorage[
			this.props.trData.symbol
		] = this.props.trData.price;
	};
	clearClassName = () => {
		this.trElem.removeAttribute("class");
	};
	itsChanged = (now, before) => {
		if (now < before) {
			this.trElem.className = "red";
		} else {
			this.trElem.className = "green";
		}
		this.updatingLastPrice();
		setTimeout(this.clearClassName, 1000);
	};
	componentDidUpdate() {
		if (
			this.props.trData.price !==
			sessionStorage[this.props.trData.symbol]
		) {
			this.itsChanged(
				this.props.trData.price,
				sessionStorage[this.props.trData.symbol]
			);
		}
	}
	render() {
		const data = this.props.trData;
		return (
			<tr id={data.symbol}>
				<td>{data.symbol}</td>
				<td>{data.price}</td>
				<td>{data.idx}</td>
			</tr>
		);
	}
}

export default Tr;

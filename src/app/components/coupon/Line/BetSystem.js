import React, {Component} from "react";
import {connect} from "react-redux";
import {delCoupon} from "../../../../redux/coupon/actions";

class BetSystem extends Component {
	state = {
		amount : '0'
	};

	changeAmount(e) {
		const {system, changeHandler} = this.props;

		this.setState({
			amount : e.target.value
		}, () => {
			changeHandler(system.system, this.state.amount);
		});
	}

	render() {
		const {system, value} = this.props;

		return (
			<div className="coupon__content__bets__bet">
				<div className="bet-players">
					{`Система ${system.m} из ${system.n}`}
				</div>
				<div className="bet-desc">
					<div className="bet-type">
						{`Вариантов: ${system.count}`}
					</div>
					<div className={`bet-koeff`}>{system.value}</div>
				</div>
				<div className="bet-amount">
					<div className="text-sum">Сумма:</div>
					<input type="text"
					       onChange={this.changeAmount.bind(this)}
					       value={value === '0' ? '' : value}/>
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({}),
	dispatch => ({
		onDelCoupon : (type, eventId) => {
			dispatch(delCoupon(type, eventId));
		}
	})
)(BetSystem);
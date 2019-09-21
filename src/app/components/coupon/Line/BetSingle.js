import React, {Component} from "react";
import EventHelper from "../../../../helpers/EventHelper";
import {connect} from "react-redux";
import {delCoupon} from "../../../../redux/coupon/actions";

class BetSingle extends Component {
	state = {
		amount : '0'
	};

	betDelete(eventId) {
		return this.props.onDelCoupon('line', eventId);
	}

	changeAmount(e) {
		const {event, changeSingleHandler} = this.props;

		this.setState({
			amount : e.target.value
		}, () => {
			changeSingleHandler(event.id, this.state.amount);
		});
	}

	render() {
		const {factorsHelper, bet, parsedBet, event, value} = this.props;

		return (
			<div className="coupon__content__bets__bet">
				<i className="fas fa-times bet-delete" onClick={this.betDelete.bind(this, event.id)}></i>
				<div className="bet-players">
					{EventHelper.parseTeams(bet.team1, bet.team2)}
				</div>
				<div className="bet-desc">
					<div className="bet-type">
						{bet.p > 0 && <span>{factorsHelper.printPeriod(bet.p)}: </span>}
						{parsedBet.text}
					</div>
					<div className={`bet-koeff koeff-${bet.fStatus}`}>{bet.v}</div>
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
)(BetSingle);
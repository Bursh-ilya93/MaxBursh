import React, {Component} from "react";
import EventHelper from "../../../helpers/EventHelper";
import FactorsHelper from "../../../helpers/FactorsHelper";
import {connect} from "react-redux";
import {delCoupon} from "../../../redux/coupon/actions";
import AirLoader from "../AirLoader";
import _ from "lodash";
import {Icon} from "semantic-ui-react";

class Bets extends Component {
	betDelete(eventId) {
		this.props.onDelCoupon('live', eventId);
	}

	render() {
		const {bets, factorsSettings} = this.props;

		if ( _.isEmpty(factorsSettings) ) {
			return <AirLoader/>;
		}

		const data = Object.entries(bets).map(([eventId, bet]) => {
			const event = {
				id       : eventId,
				sport_id : bet.sportId,
				team1    : bet.team1,
				team2    : bet.team2
			};

			const factorsHelper = new FactorsHelper(event, [], this.props.factorsSettings);
			const parsedBet = factorsHelper.parseBet(bet);

			return (
				<div key={`${bet.id}_${bet.number}`} className="coupon__content__bets__bet">
					<div className="bet-players">
						<Icon name={'delete'} className={'bet-delete'} onClick={this.betDelete.bind(this, eventId)}/>
						{EventHelper.parseTeams(bet.team1, bet.team2)}
					</div>
					<div className="bet-desc">
						<div className="bet-type">
							{bet.p > 0 && <span>{factorsHelper.printPeriod(bet.p)}: </span>}
							{parsedBet.text}
						</div>
						<div className={`bet-koeff koeff-${bet.fStatus}`}>{bet.v}</div>
					</div>
				</div>
			);
		});

		return (
			<div key={'coupon-bets'} className="coupon__content__bets">
				{data}
			</div>
		);
	}
}

export default connect(
	state => ({
		factorsSettings : state.data.lineSettings
	}),
	dispatch => ({
		onDelCoupon : (type, eventId) => {
			dispatch(delCoupon(type, eventId));
		}
	})
)(Bets);
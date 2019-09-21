import React, {Component} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {getHistoryOperations} from "../../../redux/user/history-operations/actions";
import UserPeriodFilter from "./operations/filters/UserPeriodFilter";
import * as _ from "lodash";
import UserSportFilter from "./operations/filters/UserSportFilter";
import UserBetFilter from "./operations/filters/UserBetFilter";
import Xhr from "../../../helpers/Xhr";
import UserHeader from "./UserHeader";
import MomentDate from "../MomentDate";
import EventHelper from "../../../helpers/EventHelper";
import ReactSVG from "react-svg";
import BetCheck from "./operations/BetCheck";


class BetDescription extends Component {
	render() {
		const {detail, league, event, sport = {}, filterSport} = this.props;

        const statusColors = {
            0 : 'cl-gray',
            1 : 'cl-red',
            2 : 'cl-blue'
        };
        const betStatusClass = statusColors.hasOwnProperty(detail.status) ? statusColors[detail.status] : 'cl-gray';
        const isNeedMark = sport.id == filterSport;

		const isCashOut = detail.hasOwnProperty('isCashOut') ? detail.cashOut : false;
		const cashOutIcon = isCashOut ? (
			<React.Fragment>
				<ReactSVG  className="cash-out__icon-active" src={require('../../../assets/images/cashout-active.svg')}/>
				<span className="cash-out__icon-active-result">{isCashOut}</span>
			</React.Fragment>
		) : null;


		return (
			<tr className={`description row-bets ${isNeedMark && 'mark'}`}>
				<td className="time"><MomentDate date={detail.event_time} isFormatDate={true}/></td>
				<td className="event">
					{parseInt(event.type) === 1 && <span className="live">Live.&nbsp;</span>}
					<span>{sport.name}.</span>
					<span>&nbsp;{league.name}</span><br/>
					<span>&nbsp;{EventHelper.parseTeams(event.team1, event.team2)}:</span>
					<strong>&nbsp;{detail.bet_name}</strong>
				</td>
				<td className="koeff">
					<span className={`${betStatusClass}`}>{detail.value}</span>
				</td>
				<td className={`result ${!isCashOut ? 'cashout' : ''}`}>
					{cashOutIcon}
					{detail.result !== null && <span>{detail.result}</span>}&nbsp;
				</td>
				<td className="check">&nbsp;</td>
			</tr>
		)
	}
}

const BetTitle = ({bet, user, getInfo}) => {
	const isCashOut = bet.info.hasOwnProperty('isCashOut') && bet.info.isCashOut === true;
	const cashOutIcon = isCashOut ? <span className="cash-out__icon"><ReactSVG src={require('../../../assets/images/cashout-icon.svg')}/></span> : null;

	return (
		<tr className="first">
			<td colSpan={2} className="description">
				Ст.&nbsp;№{bet.number}&nbsp;(<MomentDate date={bet.ts.toString()} isFormatDate={true}/>)
				Сумма:&nbsp;
				{bet.amount}&nbsp;{user.info.currency}&nbsp;
				{bet.type}&nbsp;
				<span style={{color : '#000'}}>{bet.count_bets > 1 && `(K=${bet.value.toFixed(2)})`}</span>
				<div>
					<span>Возможный выигрыш: <span style={{color : '#000'}}>{(bet.amount * +bet.value).toFixed(2)} BYN</span></span>
				</div>
			</td>
			<td className="koeff">
				&nbsp;
			</td>
			<td className="result">
				{cashOutIcon}
				{bet.isVip && bet.hasOwnProperty('status_vip') && bet.status_vip}
				{bet.win !== 0 && `${bet.win} ${user.info.currency}`}&nbsp;
			</td>
			<td className="print">
				<img onClick={getInfo} src={require("../../../assets/images/printer.svg")} alt="print"/>
			</td>
		</tr>
	);
};


class HistoryOperations extends Component {
	state = {
	    sports      : [],
		period      : '0',
		betType     : '-1',
		filterSport : '-1'
	};

	getInfo(bet, events) {

		const myWindow = window.open('', 'print check', 'width=700, height=415');
		myWindow.onload = () => {
			const div = myWindow.document.createElement('div'),
				  body = myWindow.document.body;

			body.style.background = '#F7F7F7';
			body.style.margin = '0';
			ReactDOM.render(<BetCheck bet={bet}
									  events={events}/>, div);
			body.insertBefore(div, body.firstChild);
		};
	}

	componentDidMount() {
        Xhr.getSports().then((resp) => {
            this.setState({
                sports   : resp.data.sports,
            });
        });

		const {onGetHistorySession} = this.props;
		onGetHistorySession(this.state.period);
		this.intervalId = setInterval(this.getNewData, 10000);
	};

	getNewData = () => {
		const {period} = this.state;
		const {onGetHistorySession} = this.props;
		onGetHistorySession(period);
	};

	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	changePeriod = (value) => {
		const {onGetHistorySession} = this.props;

		this.setState({
			period : value
		}, () => {
			onGetHistorySession(this.state.period)
		});
	};

	changeTypeOfSport = (value) => {
		this.setState({
			filterSport : value
		})
	};

	changeTypeOfBet = (value) => {
		this.setState({
			betType : value
		})
	};

	render() {
		const {bets, currency, user, leagues, events} = this.props;
		const {betType, filterSport, sports, period} = this.state;

		let filteredBets = bets;
		if ( betType != -1 ) {
			filteredBets = bets.filter(bet => bet.betType == betType);
		}

		const sortedSports = _.sortBy(sports, (s) => s.name);
		filteredBets = _.sortBy(filteredBets, i => i.number).reverse();

		return (
			<div className="user-page">
                <div className="history-operation">
                    <UserHeader text={'История операций'}/>
                    <div className="commonFilter">
                        <div className="filter">
                            <label>Операции: </label>
                            <UserPeriodFilter
								changePeriod={this.changePeriod}
								value={period}
							/>
                        </div>
                        <div className="filter">
                            <label>Виды спорта: </label>
                            <UserSportFilter
                                changeTypeOfSport={this.changeTypeOfSport}
                                sortedSports={sortedSports}
								value={filterSport}
                            />
                        </div>
                        <div className="filter">
                            <label>Тип ставки: </label>
                            <UserBetFilter
								changeTypeOfBet={this.changeTypeOfBet}
								value={betType}
							/>
                        </div>
                    </div>
                    {/*лоадер добавить       */}
                    <div className="body">
                        <table>
                            <thead>
                                <tr>
                                    <th className="time">Время</th>
                                    <th className="name-event">Событие</th>
                                    <th className="bet">К</th>
                                    <th className="result">Результат</th>
                                    <th className="print">Чек</th>
                                </tr>
                            </thead>
                            {filteredBets.map((bet, i) => {
								const {details} = bet;
								const sortedDetails = _.sortBy(details, i => i.event_time).reverse();

                                return (
                                    <tbody key={i}>
                                        <BetTitle getInfo={this.getInfo.bind(this, bet, events)} user={user} bet={bet} currency={currency}/>
                                        {sortedDetails.map((betItem, i) => {
											const event = _.first(events.filter((event) => {return parseInt(event.id) === betItem.event_id}));
											const league = _.first(leagues.filter((league) => {return parseInt(league.id) === betItem.league_id}))
											const sport = _.find(sports, (s) => {return s.id === event.sport_id});

                                        	return (
												<BetDescription
													league={league}
													sport={sport}
													event={event}
													key={i}
													detail={betItem}
													filterSport={filterSport}
												/>
											)
										})}
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
			</div>
		);
	}
}

export default connect(
	state => ({
		user     : state.user.main,
		leagues  : state.user.history_operations.leagues,
		events   : state.user.history_operations.events,
		bets     : state.user.history_operations.bets,
		currency : state.user.main.currency,
	}),
	dispatch => ({
		onGetHistorySession: (period) => dispatch(getHistoryOperations(period))
	}),
)(HistoryOperations);

import React, {Component, Fragment} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {t} from "@lib/translate";
import _ from "lodash";
import TableAddKoeff from "../TableAddKoeff";
import FactorsHelper from "../../../helpers/FactorsHelper";
import {Loader, Table} from "semantic-ui-react";
import BaseEvent from "../event/BaseEvent";
import {EventTitle} from "../event/EventTitle";
import {EventFactorRow} from "./event-details/event-factor-row";
import {EventTeams} from "./event-details/event-teams";
import EventWidgets from "./event-details/event-widgets";
import EventStat from "./event-details/event-stat";
import EventScores from "./event-details/event-scores";
import EventTimerAndComment from "./event-details/event-timer-and-comment";
import {addEventToWatch, deleteEventFromWatch} from "../../../redux/live/allEvents/actions";

class Event extends BaseEvent {
	state = {
		isRenderAdd : this.props.isOneEvent,
		isShowKoeff : this.props.isOneEvent
	};

	componentDidMount() {
		if ( this.props.isOneEvent ) {
			const {event, onGetFullFactor} = this.props;
			onGetFullFactor([event.id]);
		}

		this.props.onAddEventToWatch(this.props.event.id);
	}

	componentWillUnmount() {
		this.props.onDeleteEventFromWatch(this.props.event.id);
	}

	change = () => {
		const {event, onGetFullFactor} = this.props;
		const {isRenderAdd} = this.state;

		if ( !isRenderAdd ) {
			onGetFullFactor([event.id]);
		}

		this.changeShowKoeff();
		this.setState({
			isRenderAdd : true
		});
	};

	render() {
		const {isShowKoeff, isRenderAdd} = this.state;
		const {factors, additional_factors, additional_factors_count, event, lineSettings, loading_additional, type} = this.props;

		const sportId = event.sport_id;

		let {score, turn, period, points, timer, game, gameNum, periodNum, commentData} = event.results;

		const all_factors = factors.concat(additional_factors);
		const factorsHelper = new FactorsHelper(event, all_factors, lineSettings);

		const columns = factorsHelper.getColumns();
		const headRows = factorsHelper.getRows();

		let periodComment = '';
		if ( sportId === 3 && periodNum !== undefined && gameNum !== undefined ) {
			periodComment = <span>{`${factorsHelper.printPeriod(periodNum)}: ${gameNum}-й гейм`}</span>;
		}
		if ( sportId === 2 && periodNum !== undefined ) {
			periodComment = <span>{factorsHelper.printPeriod(periodNum)}</span>;
		}
		if ( sportId === 2 && period !== undefined && period > 0 && period % 2 === 0 ) {
			periodComment = t('Перерыв');
		}

		const has_factors = !_.isEmpty(headRows);
		const isNeedShowAdditional = isShowKoeff && additional_factors.length > 0;

		const coeffColumnStyle = {
			width : `${60 / columns.length}%`
		};

		return (
			<Fragment>
				<EventTitle titles={columns}/>

				<Table.Row>
					<Table.Cell className={'event-table__widgets'}>
						{type === 'live' &&
						<EventWidgets sportId={event.sport_id} leagueId={event.league_id} eventId={event.id}/>}
					</Table.Cell>

					<Table.Cell className={'event-table__teams'}>
						{/*Команды*/}
						<EventTeams eventId={event.id} sportId={sportId} team1={event.team1} team2={event.team2} turn={turn} type={type}/>
					</Table.Cell>

					<Table.Cell width={1} className={'event-table__stat'}>
						{/*Статистика*/}
						<EventStat statistic={''} openStatistic={this.openStatistic}/>
					</Table.Cell>

					{has_factors ?
						<EventFactorRow style={coeffColumnStyle} columns={columns} row={factorsHelper.getRows()[0]}/> :
						<Table.Cell colSpan={columns.length} rowSpan={2} textAlign={'center'} verticalAlign={'middle'}>
							{t('Прием ставок приостановлен')}
						</Table.Cell>}
				</Table.Row>

				<Table.Row>
					<Table.Cell colSpan={2}>
						<div className="service">
							<EventScores score={score} turn={turn} sportId={sportId} points={points}/>
							<EventTimerAndComment timer={timer} periodComment={periodComment} commentData={''}/>
						</div>
					</Table.Cell>

					<Table.Cell className={'event-table__dop'}>
						{/*Кнопка раскрытия допов*/}
						<div className="count-koeff rect" onClick={() => {+additional_factors_count > 0 && this.change()}}>
							{loading_additional ? <Loader size={'mini'} inline/> :
								<span>+{additional_factors_count}</span>}
						</div>
					</Table.Cell>
				</Table.Row>

				{Object.keys(headRows).map((period) => {
					if ( +period === 0 ) {
						return;
					}

					return (
						<Table.Row>
							<Table.Cell className={'event-table__period'} textAlign={'right'} colSpan={3}>{factorsHelper.printPeriod(period)}</Table.Cell>
							<EventFactorRow columns={columns} row={headRows[period]} rowSpan={1}/>
						</Table.Row>
					);
				})}

				{isNeedShowAdditional ?
					<Table.Row className={`event__add ${isNeedShowAdditional ? 'active' : ''}`}>
						<Table.Cell colSpan={columns.length + 4}>
							{isRenderAdd && additional_factors.length > 0 &&
							<TableAddKoeff factors={factorsHelper.getBodyRows()} type={"live"}/>}
						</Table.Cell>
					</Table.Row> : false
				}
			</Fragment>
		);
	}
}

export default withRouter(connect(
	(state, props) => ({
		lineSettings : state.data.lineSettings,
	}),
	dispatch => ({
		onAddEventToWatch      : (id) => dispatch(addEventToWatch(id)),
		onDeleteEventFromWatch : (id) => dispatch(deleteEventFromWatch(id)),
	})
)(Event));




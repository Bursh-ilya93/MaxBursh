import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {clearState, getLiveData, getLiveFullFactor} from "../../../redux/live/oneEvent/actions";
import {Loader, Table} from "semantic-ui-react";
import {withRouter} from "react-router";
import Breadcrumbs from "../Breadcrumbs";
import {t} from "@lib/translate";
import Event from "../event/Event";
import _ from "lodash";
import Sport from "./Live";

const OneEventLive = connect(
	(state, props) => ({
		isOneEvent               : true,
		type                     : 'live',
		opened_events            : state.live.oneEvent.opened_events,
		factors                  : state.live.oneEvent.factors[props.event.id] || [],
		additional_factors       : state.live.oneEvent.additional_factors[props.event.id] || [],
		additional_factors_count : state.live.oneEvent.additional_factors_count[props.event.id] || 0,
		loading_additional       : false,
	}),
	dispatch => ({
		onGetFullFactor : (id) => dispatch(getLiveFullFactor(id)),
	})
)(Event);

class LiveByIdComponent extends Component {
	intervalId = 0;

	shouldComponentUpdate(nextProps, nextState) {
		return JSON.stringify(nextProps) !== JSON.stringify(this.props);
	}

	componentDidMount() {
		this.loadData();
		this.intervalId = setInterval(this.loadData, 3000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalId);
		this.props.onClearState();
	}

	loadData = () => {
		const {onGetLiveData, id} = this.props;
		onGetLiveData(id);
	};

	getBreadcrumbs = (sport, league, event) => {
		let data = [];
		data.push({key : '/', value : t('Главная')});
		data.push({key : '/live', value : 'Live'});
		data.push({key : `/live-sport/${sport.id}`, value : sport.name});
		data.push({key : `/live-sport/${sport.id}/${league.id}`, value : league.name});
		data.push({key : ``, value : `${event.team1} - ${event.team2}`});
		return data;
	};

	render() {
		const {fetching} = this.props;
		const {sports, leagues, events} = this.props;

		if ( _.isEmpty(events) ) {
			return <Loader/>;
		}

		const sport = _.head(sports);
		const league = _.head(leagues[sport.id]);
		const event = _.head(events[league.id]);

		return (
			<div className={`live-by-id`}>
				<Breadcrumbs data={this.getBreadcrumbs(sport, league, event)}/>

				<p className={`live-by-id__name`}>
					<span>{sport.name}</span>.
					<span>{league.name}</span>
					<span>{`${event.team1}-${event.team2}`}</span>
				</p>
				<Table className={`event event-table`}>
					<OneEventLive key={`event-${event.id}`} event={event}/>
				</Table>
			</div>
		);
	}
}

export default withRouter(connect(
	state => ({
		fetching : state.live.oneEvent.fetching,
		sports   : state.live.oneEvent.sports || [],
		events   : state.live.oneEvent.events || {},
		leagues  : state.live.oneEvent.leagues || {}
	}),
	dispatch => ({
		onGetLiveData : (id) => dispatch(getLiveData(id)),
		onClearState  : () => dispatch(clearState())
	})
)(LiveByIdComponent));

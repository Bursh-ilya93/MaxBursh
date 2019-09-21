import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {getLive, getLiveFullFactor} from "../../../redux/live/allEvents/actions";
import _ from "lodash";
import {withRouter} from "react-router";
import Sport from "./Sport";
import League from "./League";
import Event from "./Event";
import {getLineEvents, getLineFullFactor} from "../../../redux/line/main/action";

const EventLive = connect(
	(state, props) => ({
		type                     : 'live',
		opened_events            : state.live.allEvents.opened_events,
		factors                  : state.live.allEvents.factors[props.event.id] || [],
		additional_factors       : state.live.allEvents.additional_factors[props.event.id] || [],
		additional_factors_count : state.live.allEvents.additional_factors_count[props.event.id] || 0,
		loading_additional       : state.live.allEvents.loading_additional.includes(props.event.id) || false,
	}),
	dispatch => ({
		onGetFullFactor : (id) => dispatch(getLiveFullFactor(id)),
	})
)(Event);

const EventLine = connect(
	(state, props) => ({
		type                     : 'line',
		opened_events            : state.line.main.opened_events,
		factors                  : state.line.main.factors[props.event.id] || [],
		additional_factors       : state.line.main.additional_factors[props.event.id] || [],
		additional_factors_count : state.line.main.additional_factors_count[props.event.id] || 0,
		loading_additional       : state.line.main.loading_additional.includes(props.event.id) || false,
	}),
	dispatch => ({
		onGetFullFactor : (id) => dispatch(getLineFullFactor(id)),
	})
)(Event);

class EventList extends Component {
	render() {
		const {type, sports, leagues, events, sport_alias, selected_sport, is_favorite_select, favorites, onGetLineEvents, defaultOpenLeagues = false} = this.props;
		let filterSports = sports;

		// если выбран конкретный спорт
		if ( sport_alias ) {
			const sport = _.find(sports, (s) => {return s.alias === sport_alias});
			const sportId = _.has(sport, 'id') ? sport.id : false;

			if ( sportId ) {
				filterSports = filterSports.filter(sport => sport.id === sportId);
			}
		}

		if (selected_sport !== 0) {
			filterSports = filterSports.filter(sport => +sport.id === selected_sport);
		}

		const sportsOut = [];
		filterSports.forEach((sport) => {
			if (!_.has(leagues, sport.id)) {
				return false;
			}

			const leaguesOut = [];

			leagues[sport.id].forEach((league) => {
				const eventsOut = [];

				if (!_.has(events, league.id)) {
					return false;
				}

				events[league.id].forEach((event) => {
					if ( is_favorite_select && !_.has(favorites.events, event.id) ) {
						return false;
					}

					if ( type === 'live' ) {
						eventsOut.push(<EventLive key={`event-${event.id}`} event={event}/>);
					} else {
						eventsOut.push(<EventLine key={`event-${event.id}`} event={event}/>)
					}
				});

				const isNeedLeagues = type === 'live' ? eventsOut.length > 0 : true;

				isNeedLeagues && leaguesOut.push(<League action={() => {type === 'line' && onGetLineEvents(league.id)}} type={type} defaultOpen={is_favorite_select || defaultOpenLeagues} league={league}>{eventsOut}</League>)
			});

			leaguesOut.length > 0 && sportsOut.push(<Sport sport={sport}>{leaguesOut}</Sport>)
		});

		return (
			<Fragment>
				{sportsOut}
			</Fragment>
		);
	}
}

export default withRouter(connect(
	(state, props) => ({
		favorites          : state.favorites,
		selected_sport     : props.type === 'live' ? state.live.toolbar.selected_sport : 0,
		is_favorite_select : state.live.toolbar.is_favorite_select,
	}),
	dispatch => ({
		onGetLive    : () => dispatch(getLive()),
		onGetLineEvents : (league_id) => dispatch(getLineEvents(league_id))
	})
)(EventList));
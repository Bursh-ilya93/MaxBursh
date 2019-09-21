import {t} from "@lib/translate";
import React, {Component} from "react";
import {Header, Loader} from "semantic-ui-react";
import ToolbarLive from "./ToolbarLive";
import {connect} from "react-redux";
import {getLive, getLiveAdditional, getLiveFactors} from "../../../redux/live/allEvents/actions";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import Breadcrumbs from "../Breadcrumbs";
import _ from "lodash";
import EventList from "../event/EventList";
import MxlSlider from "../slider/MxlSlider";

class LiveComponent extends Component {
	liveUpdateFactorsId = -1;
	liveUpdate = -1;

	componentDidMount() {
		this.getLive();

		this.liveUpdateFactorsId = setInterval(() => {
			this.getLive();
			this.getFactors();
		}, 5000);

		// this.liveUpdate = setInterval(() => {
		// 	this.getLive();
		// }, 10000);
	}

	getLive() {
		this.props.onGetLive();
	}

	getFactors() {
		this.props.onGetLiveFactors();
		this.props.onGetLiveAdditional();
	}

	componentWillUnmount() {
		clearInterval(this.liveUpdateFactorsId);
		// clearInterval(this.liveUpdate);
	}

	getBreadcrumbs = () => {
		let data = [];
		data.push({key : '/', value : t('Главная')});
		data.push({key : '', value : t('Live')});
		return data;
	};

	render() {
		const {sports, leagues, events, selected_sport, favorites, is_favorite_select, sport_alias = false} = this.props;

		let filterSports = sports;

		// если выбран конкретный спорт
		if ( sport_alias ) {
			const sport = _.find(sports, (s) => {return s.alias === sport_alias});
			const sportId = _.has(sport, 'id') ? sport.id : false;

			if ( sportId ) {
				filterSports = filterSports.filter(sport => sport.id === sportId);
			}
		}

		return (
			<div className={'live full'}>
				<Breadcrumbs data={this.getBreadcrumbs()}/>

				{/*<MxlSlider/>*/}

				<div className="live__header">
					<Header className="header-component">
						<span>{t('Live события')}</span>
						<span><Link to="/live">{t('Все LIVE')}({0})</Link></span>
					</Header>
					<ToolbarLive/>
				</div>

				{sports.length === 0 && <Loader className={`loader-site`}/>}

				<EventList type="live" sports={filterSports} leagues={leagues} events={events}/>
			</div>
		)
	}
}

export default withRouter(
	connect(
		state => ({
			favorites          : state.favorites,
			sports             : state.live.allEvents.sports,
			leagues            : state.live.allEvents.leagues,
			events             : state.live.allEvents.events,
			selected_sport     : state.live.toolbar.selected_sport,
			is_favorite_select : state.live.toolbar.is_favorite_select,
		}),
		dispatch => ({
			onGetLive           : () => dispatch(getLive()),
			onGetLiveFactors    : () => dispatch(getLiveFactors()),
			onGetLiveAdditional : () => dispatch(getLiveAdditional()),
		})
	)(LiveComponent)
);
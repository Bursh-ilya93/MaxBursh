import React, {Component, PureComponent} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {getLineSports} from "../../../redux/line/main/action";
import AirLoader from "../AirLoader";
import EventList from "../event/EventList";

class LineComponent extends PureComponent {
	componentWillMount() {
		this.loadData({...this.props});
		window.scrollTo(0, 0);
	}

	componentWillReceiveProps(nextProps) {
		if ( this.props.selectSports !== nextProps.selectSports ) {
			this.loadData({...nextProps});
		}
	}

	loadData(data) {
		const {onGetLineSports, selectSports} = data;
		onGetLineSports(selectSports, true);
	}

	getBreadcumbs = () => {
		let data = [];
		data.push({key : '/', value : 'Главная'});
		data.push({key : '', value : 'Все события'});
		return data;
	};

	render() {
		const {sports, leagues, events} = this.props;
		const sortedSports = _.sortBy(sports, sport => sport.name);

		return (
			<div className={`line`}>
				{sports.length === 0 && <AirLoader/>}

				<EventList type="line" defaultOpenLeagues={true} sports={sortedSports} leagues={leagues} events={events}/>
			</div>
		)
	}
}

export default React.memo(
	connect(
		(state) => ({
			sports         : state.line.main.sports || [],
			leagues        : state.line.main.leagues || {},
			events         : state.line.main.events_data || {},
			selectedSports : state.line.main.selectedSportsConfirm,
			isshowSelected : state.line.main.isshowSelected,
			fetching       : state.line.main.fetching,
		}),
		dispatch => ({
			onGetLineSports : (sports, with_leagues) => dispatch(getLineSports(sports, with_leagues)),
		})
	)(LineComponent)
);
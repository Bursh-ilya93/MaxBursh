import React, {Component} from "react";
import {CortIcon} from "../../ZoneIcon";
import ReactSVG from "react-svg";
import {connect} from "react-redux";
import {toggleFavorite} from "../../../../redux/favorites/actions";
import _ from "lodash";

class EventWidgets extends Component {
	render() {
		const {sportId, leagueId, eventId, onToggleFavorite, favorites} = this.props;
		const isFavorite = _.has(favorites['events'], eventId);

		return (
			<div className="widgets">
				<CortIcon id={sportId}/>
				<ReactSVG className={`star ${isFavorite ? "active" : ""}`}
				          onClick={() => {onToggleFavorite(eventId, 'events')}}
				          src={require('../../../../assets/images/sport-star-no-select.svg')}/>
			</div>
		)
	}
}

export default connect(
	state => ({
		favorites : state.favorites
	}),
	dispatch => ({
		onToggleFavorite: (data, favorite_type) => dispatch(toggleFavorite(data, favorite_type)),
	})
)(EventWidgets);
import React, {Component} from "react";
import {connect} from "react-redux";
import {SportIcon} from "../SportIcon";
import ReactSVG from "react-svg";
import {selectLiveSport, toggleIsFavorite} from "../../../redux/live/toolbar/actions";
import _ from "lodash";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";

class ToolbarLife extends Component {
	render() {
		const {onToggleIsFavorite, onSelectLiveSport} = this.props;
		const {is_favorite_select, selected_sport, sports, favorites} = this.props;
		const isActiveStar = !_.isEmpty(favorites.events);

		return (
			<div className="toolbar">
				<span onClick={() => onSelectLiveSport(-1)}
				      className={`fire ${selected_sport === -1 ? "selected" : ""}`}>
					<ReactSVG src={require(`../../../assets/images/fire.svg`)}/>
				</span>

				<span onClick={!_.isEmpty(favorites.events) && onToggleIsFavorite}
				      className={`star ${is_favorite_select ? "selected" : ""} ${isActiveStar && "active-favorites"}`}>
					<ReactSVG className={'icon-sport'} src={require(`../../../assets/images/star.svg`)}/>
				</span>

				{/*{sports.map(sport =>*/}
				{/*<span className={selected_sport === +sport.id ? "selected" : ""}*/}
				{/*key={`toolbar-${sport.id}`}*/}
				{/*onClick={() => onSelectLiveSport(+sport.id)}>*/}
				{/*<SportIcon id={sport.id}/>*/}
				{/*</span>)}	*/}

				{sports.map(sport =>
					<NavLink to={`/live-sport/${sport.alias}`}
					         key={`toolbar-${sport.id}`}>
						<SportIcon id={sport.id}/>
					</NavLink>)}

				<span className="camera">
					<ReactSVG src={require(`../../../assets/images/camera.svg`)}/>
				</span>
				<span className="tv">
					<ReactSVG src={require(`../../../assets/images/tv.svg`)}/>
				</span>
			</div>
		)
	}
}

export default withRouter(
	React.memo(
		connect(
			state => ({
				favorites          : state.favorites,
				sports             : state.live.allEvents.sports || [],
				selected_sport     : state.live.toolbar.selected_sport,
				is_favorite_select : state.live.toolbar.is_favorite_select,
			}),
			dispatch => ({
				onSelectLiveSport  : (id) => dispatch(selectLiveSport(id)),
				onToggleIsFavorite : () => dispatch(toggleIsFavorite()),
			})
		)(ToolbarLife)
	)
);

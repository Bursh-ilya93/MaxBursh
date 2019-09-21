import ACTIONS from "../../constants/actions";
import Xhr from "../../../helpers/Xhr";
import _ from "lodash";
import {convertEvents} from "../../../converters/EventsConverter";

export const getLineSports = (sports = '', with_leagues = false) => dispatch => {
	Xhr.getLineSports(sports, with_leagues).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_SPORTS,
			data : _.has(resp, 'data') ? convertEvents(resp.data) : [],
		});
	});
};

export const getLineEvents = (league_id, show = false) => dispatch => {
	if ( show ) {
		return dispatch({
			type      : ACTIONS.LINE.TOGGLE_LEAGUE,
			league_id : league_id
		});
	}

	dispatch({
		type      : ACTIONS.LINE.GET_EVENTS.REQUEST,
		league_id : league_id
	});

	Xhr.getLineEvents(league_id).then((resp) => {
		dispatch({
			type      : ACTIONS.LINE.GET_EVENTS.SUCCESS,
			data      : _.has(resp, 'data') ? convertEvents(resp.data) : {},
			league_id : league_id
		});
	});
};

export const getLineFullFactor = (ids) => dispatch => {
	dispatch({type : ACTIONS.LINE.GET_FACTOR_BY_ID.REQUEST, data : ids});

	Xhr.getLineFactorByEvent(ids.join('-')).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_FACTOR_BY_ID.SUCCESS,
			data : resp ? resp.data : [],
		});
	}).catch((e) => {
		dispatch({type : ACTIONS.LINE.GET_FACTOR_BY_ID.FAILURE});
	});
};
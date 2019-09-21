import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";
import {convertEvents} from "../../../converters/EventsConverter";

export const clearState = () => dispatch => {
	dispatch({type : ACTIONS.LIVE.GET_BY_ID.CLEAR_STATE});
};

export const getLiveData = (id) => dispatch => {
	dispatch({type : ACTIONS.LIVE.GET_BY_ID.REQUEST});

	Xhr.getLiveData(id)
		.then((resp) => {
			dispatch({
				type : ACTIONS.LIVE.GET_BY_ID.SUCCESS,
				data : resp ? convertEvents(resp.data) : {},
			});
		})
		.catch(() => {
			dispatch({
				type : ACTIONS.LIVE.GET_BY_ID.FAILURE
			});
		});
};

export const getLiveFullFactor = (ids) => dispatch => {
	dispatch({type : ACTIONS.LIVE.GET_BY_ID.FULL_FACTOR.REQUEST, data : ids});

	Xhr.getLiveFactorByEvent(ids.join('-')).then((resp) => {
		dispatch({
			type : ACTIONS.LIVE.GET_BY_ID.FULL_FACTOR.SUCCESS,
			data : resp ? resp.data : [],
		});
	}).catch((e) => {
		dispatch({type : ACTIONS.LIVE.GET_BY_ID.FULL_FACTOR.FAILURE});
	});
};


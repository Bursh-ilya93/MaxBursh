import ACTIONS from "../../constants/actions";
import _ from "lodash";

/**
 * Добавление события для отслеживания изменений
 * @param event_id
 * @returns {Function}
 */
export const addEventToWatch = (event_id) => dispatch => {
	// dispatch(getLiveFactors([event_id]));

	dispatch({
		type   : ACTIONS.SOCKET.MESSAGE,
		data   : {
			task   : 'Event',
			action : 'SubscribeEvent',
			data   : {
				eventId : event_id
			}
		},
		socket : {
			send : true
		}
	});

	dispatch({
		type : ACTIONS.LIVE.ADD_EVENT_TO_WATCH,
		event_id
	});
};

/**
 * Удаление события из отслеживания изменений
 * @param event_id
 * @returns {Function}
 */
export const deleteEventFromWatch = (event_id) => dispatch => {
	dispatch({
		type   : ACTIONS.SOCKET.MESSAGE,
		data   : {
			task   : 'Event',
			action : 'UnsubscribeEvent',
			data   : {
				eventId : event_id
			}
		},
		socket : {
			send : true
		}
	});

	dispatch({
		type : ACTIONS.LIVE.DELETE_EVENT_FROW_WATCH,
		event_id
	});
};

/**
 * Получение лайва
 * @returns {Function}
 */
export const getLive = () => dispatch => {
	dispatch({
		type   : ACTIONS.SOCKET.MESSAGE,
		data   : {
			task   : 'Event',
			action : 'Live',
			data   : []
		},
		socket : {
			send : true
		}
	});
};

export const getLiveFactors = (ids = []) => (dispatch, getState) => {
	if ( _.isEmpty(ids) ) {
		const state = getState();
		ids = _.keys(state.live.allEvents.opened_events);
	}

	if ( _.isEmpty(ids) ) {
		return;
	}

	dispatch({
		type   : ACTIONS.SOCKET.MESSAGE,
		data   : {
			task   : 'Event',
			action : 'LiveGetFactors',
			data   : {events : ids}
		},
		socket : {
			send : true
		}
	});
};

export const getLiveAdditional = (ids = []) => (dispatch, getState) => {
	if ( _.isEmpty(ids) ) {
		const state = getState();
		ids = _.keys(state.live.allEvents.additional_factors);
	}

	if ( ids.length === 0 ) {
		return;
	}

	dispatch({
		type   : ACTIONS.SOCKET.MESSAGE,
		data   : {
			task   : 'Event',
			action : 'LiveGetAdditional',
			data   : {events : ids}
		},
		socket : {
			send : true
		}
	});
};

export const getLiveFullFactor = (ids) => dispatch => {
	dispatch({type : ACTIONS.LIVE.GET_FACTOR_BY_ID.REQUEST, data : ids});
	dispatch(getLiveAdditional(ids));
};
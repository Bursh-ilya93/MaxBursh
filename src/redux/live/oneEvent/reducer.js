import ACTIONS from "../../constants/actions";

const initState = {
	events                   : {},
	sports                   : {}, // список спортов
	leagues                  : {}, // список турниров по видам спорта
	factors                  : {},
	additional_factors       : {},
	additional_factors_count : {},
	fetching                 : false
};

export function oneEvent(state = initState, action) {
	switch ( action.type ) {
		case ACTIONS.LIVE.GET_BY_ID.CLEAR_STATE: {
			return initState;
		}

		case ACTIONS.LIVE.GET_BY_ID.FAILURE:
		case ACTIONS.LIVE.GET_BY_ID.REQUEST: {
			return {...state, fetching : true};
		}

		case ACTIONS.LIVE.GET_BY_ID.SUCCESS : {
			const {events, leagues, additional_factors, additional_factors_count, factors, sports} = action.data;

			return {
				...state,
				sports,
				leagues,
				factors,
				events,
				additional_factors,
				additional_factors_count,
			};
		}

		/**
		 * Получение допов
		 */
		case ACTIONS.LIVE.GET_BY_ID.FULL_FACTOR.SUCCESS: {
			return {
				...state,
				loading_additional       : [],
				factors                  : {...state.factors, ...action.data.factors},
				additional_factors       : {...state.additional_factors, ...action.data.additional_factors},
				additional_factors_count : {...state.additional_factors_count, ...action.data.additional_factors_count}
			};
		}

		case ACTIONS.LIVE.GET_BY_ID.FULL_FACTOR.REQUEST: {
			return {...state, loading_additional : action.data};
		}

		default:
			return state;
	}
}
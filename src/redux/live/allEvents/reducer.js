import ACTIONS from "../../constants/actions";
import ObjectHelper from "@helpers/ObjectHelper";
import {convertEvents} from "../../../converters/EventsConverter";
import {toast} from "react-toastify";

const initialState = {
	events                   : {},
	results                  : {},
	sports                   : [], // список спортов
	leagues                  : {}, // список турниров по видам спорта
	factors                  : {},
	additional_factors       : {},
	additional_factors_count : {},

	loading_additional : [],
	loading_leagues    : {},
	loading_events     : {},

	opened_sports  : {},
	opened_leagues : {},
	opened_events  : {}
};

export default function allEvents(state = initialState, action) {
	switch ( action.type ) {
		case 'SEND':
		{
			toast.success(action.data.message);
			return {...state};
		}
		case ACTIONS.SOCKET.MESSAGE : {
			return {...state}
		}

		/**
		 * Отслеживание открытых событий в лайве
		 */
		case ACTIONS.LIVE.ADD_EVENT_TO_WATCH : {
			const opened_events = ObjectHelper.add({...state.opened_events}, action.event_id);
			return {...state, opened_events};
		}

		case ACTIONS.LIVE.DELETE_EVENT_FROW_WATCH : {
			const opened_events = ObjectHelper.delete({...state.opened_events}, action.event_id);
			return {...state, opened_events};
		}

		/**
		 * Получение лайва
		 **/
		case ACTIONS.LIVE.GET.REQUEST: {
			return {...state};
		}

		case ACTIONS.LIVE.GET.SUCCESS: {
			const {events, leagues, results, sports} = convertEvents(action.data);

			return {...state, sports, leagues, results, events};
		}

		/**
		 * Получение основных кефов
		 */
		case ACTIONS.LIVE.GET.FACTORS: {
			const {additional_factors, additional_factors_count, factors} = action.data;

			return {
				...state,
				factors                  : {...state.factors, ...factors},
				additional_factors       : {...state.additional_factors, ...additional_factors},
				additional_factors_count : {...state.additional_factors_count, ...additional_factors_count},
			};
		}

		/**
		 * Получение допов
		 */
		case ACTIONS.LIVE.GET_FACTOR_BY_ID.REQUEST: {
			return {...state, loading_additional : action.data};
		}

		case ACTIONS.LIVE.GET.ADDITIONAL: {
			const {additional_factors, additional_factors_count, factors} = action.data;

			return {
				...state,
				loading_additional       : [],
				factors                  : {...state.factors, ...factors},
				additional_factors       : {...state.additional_factors, ...additional_factors},
				additional_factors_count : {...state.additional_factors_count, ...additional_factors_count},
			};
		}

		/**
		 * Открытие/закрытие спортов и турниров
		 */
		case ACTIONS.LIVE.TOGGLE_SPORT: {
			const opened_sports = ObjectHelper.toggle({...state.opened_sports}, action.sport_id);
			return {...state, opened_sports};
		}

		case ACTIONS.LIVE.TOGGLE_LEAGUE: {
			const opened_leagues = ObjectHelper.toggle({...state.opened_leagues}, action.league_id);
			return {...state, opened_leagues};
		}

		default:
			return state;
	}

}

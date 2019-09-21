import ACTIONS from "../../constants/actions";
import ObjectHelper from "../../../helpers/ObjectHelper";

const initState = {
	events_data              : {},
	results                  : {},
	sports                   : [], // список спортов
	leagues                  : {}, // список турниров по видам спорта
	factors                  : {},
	additional_factors       : {},
	additional_factors_count : {},
	selectedSport            : {},
	selectByStar             : {},

	loading_additional : [],
	loading_leagues    : {},
	loading_events     : {},

	opened_sports  : {},
	opened_leagues : {},
	opened_events  : {}
};

export default function select(state = initState, action) {
	switch ( action.type ) {
		case ACTIONS.LINE.GET_SPORTS: {
			const {leagues, sports, events, factors, additional_factors, additional_factors_count} = action.data;

			let opened_sports = {...state.opened_sports};
			sports.forEach((sport) => {
				opened_sports = ObjectHelper.add(opened_sports, sport.id);
			});

			return {...state, sports, events_data: events, leagues, factors, additional_factors, additional_factors_count, opened_sports };
		}

		case ACTIONS.LINE.TOGGLE_SPORT: {
			const opened_sports = ObjectHelper.delete({...state.opened_sports}, action.sport_id);
			return {...state, opened_sports};
		}

		case ACTIONS.LINE.TOGGLE_LEAGUE: {
			const opened_leagues = ObjectHelper.delete({...state.opened_leagues}, action.league_id);
			return {...state, opened_leagues};
		}

		case ACTIONS.LINE.GET_LEAGUES.SUCCESS: {
			const loading_leagues = {...state.loading_leagues};
			if ( loading_leagues.hasOwnProperty(action.sport_id) ) {
				delete loading_leagues[action.sport_id];
			}

			const opened_sports = ObjectHelper.toggle({...state.opened_sports}, action.sport_id);

			return {...state, leagues : {...state.leagues, ...action.data}, loading_leagues, opened_sports};
		}

		case ACTIONS.LINE.GET_LEAGUES.REQUEST: {
			const loading_leagues = ObjectHelper.toggle({...state.loading_leagues}, action.sport_id);
			return {...state, loading_leagues};
		}

		// get events
		case ACTIONS.LINE.GET_EVENTS.REQUEST: {
			const loading_events = ObjectHelper.toggle({...state.loading_events}, action.league_id);
			return {...state, loading_events};
		}

		case ACTIONS.LINE.GET_EVENTS.SUCCESS: {
			const loading_events = ObjectHelper.delete({...state.loading_events}, action.league_id);
			const opened_leagues = ObjectHelper.toggle({...state.opened_leagues}, action.league_id);

			const {events, leagues, additional_factors_count, factors, results} = action.data;

			return {
				...state,
				leagues                  : {...state.leagues, ...leagues},
				factors                  : {...state.factors, ...factors},
				results                  : {...state.results, ...results},
				events_data              : {...state.events_data, ...events},
				additional_factors_count : {...state.additional_factors_count, ...additional_factors_count},
				opened_leagues,
				loading_events
			};
		}
		// get events end

		case ACTIONS.LINE.GET_FACTOR_BY_ID.SUCCESS: {
			return {
				...state,
				loading_additional       : [],
				factors                  : {...state.factors, ...action.data.factors},
				additional_factors       : {...state.additional_factors, ...action.data.additional_factors},
				additional_factors_count : {...state.additional_factors_count, ...action.data.additional_factors_count}
			};
		}
		case ACTIONS.LINE.GET_FACTOR_BY_ID.REQUEST: {
			return {...state, loading_additional : action.data};
		}

		default:
			return state;
	}
}
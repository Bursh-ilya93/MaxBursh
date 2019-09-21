import ACTIONS from "../../constants/actions";

const initialState = {
	selected_sport     : 0,
	is_favorite_select : false,
};

export default function liveToolbar(state = initialState, action) {
	switch ( action.type ) {
		/**
		 * Фильтр спортов в лайве
		 */
		case ACTIONS.LIVE.TOOLBAR.SELECT_SPORT: {
			const selected_sport = state.selected_sport === action.id ? 0 : action.id;

			return {...state, selected_sport};
		}

		case ACTIONS.LIVE.TOOLBAR.TOGGLE_IS_FAVORITE: {
			return {...state, is_favorite_select : !state.is_favorite_select};
		}

		default:
			return state;
	}

}

import ACTIONS from "../../constants/actions";

const initialState = {
	bets   : [],
	events : [],
	leagues: [],
	sports : [],
};

export default function user(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.USER.HISTORY_OPERATIONS:
			return {...state, ...action.data};
		default:
			return state;
	}
}
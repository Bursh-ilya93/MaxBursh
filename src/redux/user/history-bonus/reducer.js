import ACTIONS from "../../constants/actions";

const initialState = {
	value: []
};

export default function user(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.USER.HISTORY_BONUS:
			return {...state, value: action.data};
		default:
			return state;
	}
}
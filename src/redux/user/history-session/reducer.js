import ACTIONS from "../../constants/actions";

const initialState = {
	value: []
};

export default function historySessions(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.USER.HISTORY_SESSION:
			return {...state, value: action.data};
		default:
			return state;
	}
}
import ACTIONS from "../../constants/actions";

const initialState = {
	payments: []
};

export default function user(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.PAYMENTS.GET_HISTORY:
			return {...state, ...action.data};
		case ACTIONS.PAYMENTS.CANCEL:
			return {...state, ...action.data};
		default:
			return state;
	}
}
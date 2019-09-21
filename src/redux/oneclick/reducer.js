import ACTIONS from "../constants/actions";

const initialState = {
	isOneClick : false,
	amount     : 0,
	processing : false
};

export default function oneclick(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.ONECLICK.TOGGLE: {
			const newState = {
				isOneClick : !state.isOneClick,
			};

			return Object.assign({}, {...state, ...newState});
		}
		case ACTIONS.ONECLICK.CHANGE_AMOUNT: {
			const newState = {
				amount : action.data
			};

			return Object.assign({}, {...state, ...newState});
		}
		case ACTIONS.ONECLICK.START_PROCESSING : {
			const newState = {
				processing : true
			};

			return Object.assign({}, {...state, ...newState});
		}
		case ACTIONS.ONECLICK.STOP_PROCESSING : {
			const newState = {
				processing : false
			};

			return Object.assign({}, {...state, ...newState});
		}
		default:
			break;
	}

	return state;
}
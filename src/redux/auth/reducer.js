import ACTIONS from "../constants/actions";

const initState = {
	id       : 0,
	isAuth   : !!localStorage.getItem('auth'),
	money    : 0.0,
	isOnline : true
};


export default function auth(state = initState, action) {
	switch ( action.type ) {
		case ACTIONS.AUTH.UPDATE:
		{

			return {...state, ...action.data};
		}
		case ACTIONS.AUTH.IS_ONLINE: {
			return {...state, isOnline : action.data};
		}
		default:
			break;
	}

	return state;
}

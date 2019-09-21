import ACTIONS from "../../../constants/actions";

const initialState = {
	leagues: [],
	populars: [],
	sports: [],
	fetching : false
};

export default function popular(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.LINE.GET_POPULAR:
			return {...state, ...action.data};
		case ACTIONS.LINE.POP_FETCHING:
			return Object.assign({}, state, {fetching : !state.fetching});
	}
	return state;
}
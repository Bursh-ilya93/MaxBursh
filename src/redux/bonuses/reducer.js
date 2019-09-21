import ACTIONS from "../constants/actions";

const initialState = {
	bonuses : [],
	loading : false
};

export default function reducer(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.BONUS.GET.FETCHING: {
			return {...state, loading : true};
		}
		case ACTIONS.BONUS.GET.SUCCESS: {
			const bonuses = action.data;
			return {...state, bonuses, loading : false};
		}
	}

	return state;
}
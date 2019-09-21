import ACTIONS from "../../../constants/actions";

const initialState = {
	sports   : [],
	leagues  : [],
	fetching : false,
	period   : 0
};

//фетч запоминает айи загружаемой спорта

export default function main(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.LINE.GET_LINE:
			return {...state, ...action.data, fetching : false};
		case ACTIONS.LINE.GET_LEAGUES:
			return {...state, leagues: {...state.leagues, ...action.data}, fetching : false};
		case ACTIONS.LINE.FETCHING:
			return {...state, fetching : action.id || false};
	}
	return state;
}
import ACTIONS from "../constants/actions";

const  initState = {
	selectSport: 1,
	dataSport  : {},
	selectAll  : {
		leagues: [],
	},
	fetching   : false
};

export default function popular(state = initState, action) {
	switch(action.type) {
		case ACTIONS.LINE.SELECT_FETCHING:
			return {...state, fetching: !state.fetching};
		case ACTIONS.LINE.SELECT_SPORT:
			return {...state, selectSport: action.id};
		case ACTIONS.LINE.LINE_SELECT:
			const {leagues} = action.data.leagues;
			return {...state, selectAll: {leagues: [...leagues]}};
		case ACTIONS.LINE.GET_LINE_DATA:
			const {dataSport} = state;
			return {...state, dataSport: {...dataSport, [action.sportId]: {...action.data}}};
		default:
			return state;
	}
}
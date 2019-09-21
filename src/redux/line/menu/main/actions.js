import ACTIONS from "../../../constants/actions";
import Xhr from "../../../../helpers/Xhr";
import {getPopular} from "../popular/actions";

//тут все спорты

export const getLine = (period) => dispatch => {
	dispatch({type : ACTIONS.LINE.FETCHING});

	Xhr.getLine(period).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_LINE,
			data : resp ? resp.data : [],
		});

		dispatch({type : ACTIONS.LINE.FETCHING});
	});
};

//тут все лиги на спорты
export const getLeagues = (sportId, period = 0) => dispatch => {
	dispatch({type : ACTIONS.LINE.FETCHING, id: sportId});

	Xhr.getLeague(sportId, period).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_LEAGUES,
			data : resp ? {[sportId]: resp.data.leagues} : [],
		});

		dispatch({type : ACTIONS.LINE.FETCHING});
	});
};

export const changeFilter = (period = 0) => dispatch =>  {
	dispatch(getLine(period));
	dispatch(getLeagues("", period));
	dispatch(getPopular(period));
};
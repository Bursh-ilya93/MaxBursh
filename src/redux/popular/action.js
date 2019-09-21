import ACTIONS from "../constants/actions";
import Xhr from "../../helpers/Xhr";

export const selectSport = (id) => dispatch => {
	dispatch({
		type: ACTIONS.LINE.SELECT_SPORT,
		id
	});
};


//передаю спорты
//беру и для популярс и дли линиии

export const lineSelect = (ids) => dispatch => {
	dispatch({type: ACTIONS.LINE.SELECT_FETCHING});
	Xhr.getLineSelect(ids.join('-')).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.LINE_SELECT,
			data : resp ? resp.data : [],
		});
		dispatch({type: ACTIONS.LINE.SELECT_FETCHING});
	});
};


//здесь получаю 5 лиг по сопрту для популярс
export const getSomeLineInfoForPopulars = (ids, sportId) => dispatch => {
	dispatch({type: ACTIONS.LINE.SELECT_FETCHING});
	Xhr.getLineData(ids.join('-')).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_LINE_DATA,
			data : resp ? resp.data : [],
			sportId
		});
		dispatch({type: ACTIONS.LINE.SELECT_FETCHING});
	});
};

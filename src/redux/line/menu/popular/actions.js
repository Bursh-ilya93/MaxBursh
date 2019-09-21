import ACTIONS from "../../../constants/actions";
import Xhr from "../../../../helpers/Xhr";
import {convertListResp} from "./converter";


//тут менятеся все по популрному меню
export const getPopular = (period) => dispatch => {
	dispatch({type : ACTIONS.LINE.POP_FETCHING});

	Xhr.getPopulars(period).then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_POPULAR,
			data : resp ? convertListResp(resp.data) : [],
		});

		dispatch({type : ACTIONS.LINE.POP_FETCHING});
	});
};
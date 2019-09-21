import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getHistoryBonus = () => dispatch => {
	Xhr.getHistoryBonus().then((resp) => {
		dispatch({
			type : ACTIONS.USER.HISTORY_BONUS,
			data : resp.data,
		});

	});
};
import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getHistoryOperations = (period) => dispatch => {
	Xhr.getHistoryOperations(period).then((resp) => {
		dispatch({
			type : ACTIONS.USER.HISTORY_OPERATIONS,
			data : resp.data,
		});

	});
};
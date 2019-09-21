import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getHistorySession = (period) => dispatch => {
	Xhr.getHistorySessions(period).then((resp) => {
		dispatch({
			type : ACTIONS.USER.HISTORY_SESSION,
			data : resp,
		})
	});
};

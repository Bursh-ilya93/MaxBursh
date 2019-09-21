import ACTIONS from "../constants/actions";
import Xhr from "../../helpers/Xhr";

export const loadBonus = () => dispatch => {
	dispatch({
		type: ACTIONS.BONUS.GET.FETCHING
	});

	Xhr.getBonuses().then(resp => {
		if ( resp.status === 'ok' ) {
			return dispatch({
				type: ACTIONS.BONUS.GET.SUCCESS,
				data: resp.data
			});
		}

		throw new Error();
	}).catch(err => {
		dispatch({
			type: ACTIONS.BONUS.F,
			data: err
		});
	});
};
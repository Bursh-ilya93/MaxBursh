import ACTIONS from "../constants/actions";
import Xhr from "../../helpers/Xhr";
import {logOut} from "../user/main/actions";
import _ from "lodash";

export const isAuth = () => dispatch => {
	dispatch({
		type : ACTIONS.AUTH.IS_ONLINE,
		data : window.navigator.onLine
	});

	Xhr.isAuth().then((resp) => {
		if (!_.has(resp, 'data')) {
			return;
		}

		if ( _.has(resp.data, 'isAuth') && !resp.data.isAuth ) {
			dispatch(logOut());
		}

		dispatch({
			type : ACTIONS.AUTH.UPDATE,
			data : resp.data
		});
	});
};

import ACTIONS from "../../constants/actions";
import Xhr from "../../../helpers/Xhr";
import {logOut} from "../../user/main/actions";

export const fetchNews = () => dispatch => {
	dispatch({type : ACTIONS.NEWS.FETCHING});

	Xhr.getLastNews().then((resp) => {
		if ( resp.data.hasOwnProperty('isAuth') && !resp.data.isAuth ) {
			dispatch(logOut());
		}

		dispatch({
			type : ACTIONS.NEWS.UPDATE,
			data : resp.data
		});

		dispatch({type : ACTIONS.NEWS.FETCHING});
	});
};
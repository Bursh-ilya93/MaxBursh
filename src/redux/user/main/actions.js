import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getInfo = () => dispatch => {
	Xhr.getInfo().then((resp) => {
		dispatch({
			type : ACTIONS.USER.GET_INFO,
			data : resp.data
		});
		window.location.reload();
	});
};

export const logIn = (login, password) => dispatch => {
	Xhr.login(login, password).then((resp) => {
		dispatch({
			type : ACTIONS.USER.LOGIN,
			data : resp.data,
		});

		if ( resp.status === 'ok' ) {
			dispatch(getInfo());
		}
	});

};

export const saveInfo = (info) => dispatch => {
	dispatch({
		type : ACTIONS.USER.SAVE_INFO,
		info,
	});
};

export const changeChecked = (key) => dispatch => {
	dispatch({
		type : ACTIONS.USER.CHANGE_CHECKED,
		key,
	});
};


export const logOut = () => dispatch => {
	dispatch({type : ACTIONS.USER.LOGOUT});
	// document.location.reload();
};


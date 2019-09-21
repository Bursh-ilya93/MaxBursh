import Xhr from "../../helpers/Xhr";
import ACTIONS from "../constants/actions";

export const pingPong = () => dispatch => {
	dispatch({
		type   : ACTIONS.SOCKET.MESSAGE,
		data   : 'PING',
		socket : {
			send : true
		}
	});
};

export const getLineSettings = () => dispatch => {
	Xhr.lineSettings().then((resp) => {
		dispatch({
			type : ACTIONS.LINE.GET_SETTINGS,
			data : resp.data
		});
	});
};

export const changeTheme = () => dispatch => {
	dispatch({
		type : ACTIONS.SYSTEM.CHANGE_THEME
	});
};

export const changeLanguage = (lang) => dispatch => {
	dispatch({
		type : ACTIONS.SYSTEM.CHANGE_LANGUAGE,
		lang
	});
};
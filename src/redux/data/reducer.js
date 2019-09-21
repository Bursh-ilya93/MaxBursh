import ACTIONS from "../constants/actions";

const keys = {
	theme : 'theme',
	lang  : '_lang'
};

const initialState = {
	lineSettings : {},
	theme        : localStorage.getItem(keys.theme) || "light",
	lang         : localStorage.getItem(keys.lang) || "ru",
	localization : {}
};

export default function data(state = initialState, action) {
	switch ( action.type ) {
		case 'DATA_PING_PONG' : {
			return state;
		}

		case ACTIONS.LINE.GET_SETTINGS: {
			return {...state, lineSettings : action.data};
		}

		case ACTIONS.SYSTEM.CHANGE_THEME: {
			let {theme} = state;

			if ( theme === "light" ) {
				theme = "dark";
			} else {
				theme = "light"
			}

			localStorage.setItem(keys.theme, theme);
			return {...state, theme};
		}
		case ACTIONS.SYSTEM.CHANGE_LANGUAGE: {
			let {lang} = action;
			localStorage.setItem(keys.lang, lang);
			return {...state, lang};
		}

		case ACTIONS.SYSTEM.LOCALIZATION: {
			return {...state, localization : action.data}
		}
	}

	return state;
}
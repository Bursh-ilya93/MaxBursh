import ACTIONS from "../../constants/actions";

const defaultData = {
		info     : {
			currency    : "BYN",
			email       : "",
			first_name  : "",
			id          : 0,
			last_name   : "",
			login       : "",
			middle_name : "",
			money       : 0,
		},
		login    : {
			auth   : false,
			atoken : '',
		},
		messages : [],
		info_checked: {
			login: true,
			password: false,}
	}
;

const dataFromLs = localStorage.getItem('user');
const initialState = dataFromLs ? JSON.parse(dataFromLs) : defaultData;

export default function user(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.USER.LOGIN: {
			if ( action.data.hasOwnProperty('messages') ) {
				return Object.assign({}, state, {messages : action.data.messages});
			}

			let out = Object.assign({}, state);

			if ( action.data.auth ) {
				out = Object.assign(out, {login : action.data});
				localStorage.setItem('token', action.data.atoken);
				localStorage.setItem('auth', 'true');
				localStorage.setItem('user', JSON.stringify(out));
			}

			return out;
		}

		case ACTIONS.USER.LOGOUT: {
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			return Object.assign({}, defaultData);
		}

		case ACTIONS.USER.CHANGE_CHECKED: {
			const out = {...state};
			out.info_checked[action.key] = !out.info_checked[action.key];
			if (!out.info_checked[action.key]) {
				localStorage.removeItem(action.key);
			}
			return out;
		}

		case ACTIONS.USER.GET_INFO: {
			let out = Object.assign({}, state);
			if ( action.data.hasOwnProperty('user') ) {
				Object.assign(out, {info : action.data.user});
				localStorage.setItem('user', JSON.stringify(out));
			}

			console.log(action.data);
			return out;
		}

		case ACTIONS.USER.SAVE_INFO: {
			localStorage.removeItem('login');
			localStorage.removeItem('password');
			Object.keys(state.info_checked).forEach((key) => {
				if (state.info_checked[key]) {
					localStorage.setItem(key, action.info[key]);
				}
			});
			break;
		}

		default:
			break;
	}

	return state;
}
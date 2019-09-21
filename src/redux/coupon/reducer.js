import ACTIONS from "../constants/actions";
import _ from "lodash";
import ObjectHelper from "../../helpers/ObjectHelper";

const storageKey = 'coupon';
const dataFromLs = localStorage.getItem(storageKey);
const defaultData = {};
const initialState = dataFromLs ? JSON.parse(dataFromLs) : defaultData;

export default function coupon(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.COUPON.UPDATE: {
			const data = action.data;
			const isError = data.status === 'error';

			if (_.isEmpty(data)) {
				return {initialState, isError};
			}

			const coupon = action.data.coupon;
			const bets = _.has(coupon, 'bets') ? _.values(coupon.bets) : [];

			let selected = {};
			bets.forEach((bet) => {
				selected = ObjectHelper.add(selected, `${bet.e}_${bet.f}`);
			});

			const bet_data = _.has(data, 'bet_data') ? data.bet_data : false;
			let messages = _.has(data, 'messages') ? data.messages : [];

			if ( bet_data ) {
				messages = messages.map((message) => {
					return message.replace('%amount%', bet_data.amount).replace('%currency%', bet_data.currency);
				});
			}


			// localStorage.setItem(storageKey, JSON.stringify(data));
			return {...state, selected, ...data, messages, isError};
		}

		case ACTIONS.COUPON.CHANGE_LIVE_OPT:
			return {...state, ...action.data};

		default:
			break;
	}

	return state;
}
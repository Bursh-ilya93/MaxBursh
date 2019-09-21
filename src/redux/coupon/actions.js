import ACTIONS from "../constants/actions";
import Xhr from "../../helpers/Xhr";
// import {getCash} from "./user";
import {toggleProcessing} from "../oneclick/actions";
import _ from "lodash";
import {toast} from "react-toastify";

export const getCoupon = (type) => dispatch => {
	Xhr.getCoupon(type).then((resp) => dispatch({
		type     : ACTIONS.COUPON.UPDATE,
		data     : _.has(resp, 'data') ? resp.data : {},
		fetching : false
	}));
};

export const getCouponLine = (type) => dispatch => {
	Xhr.getCouponLine(type).then((resp) => dispatch({
		type     : ACTIONS.COUPON.UPDATE,
		data     : resp.data,
		fetching : false
	}));
};

export const addToCoupon = (eventId, hash) => dispatch => {
	Xhr.couponAdd(eventId, hash).then((resp) => {
		if ( _.has(resp, 'messages') ) {
			toast.error(resp.messages.join(', '));
		}

		dispatch({
			type : ACTIONS.COUPON.UPDATE,
			data : resp.data
		})
	});
};

export const addToCouponAndMakeBet = (eventId, hash, type, data) => dispatch => {
	dispatch(toggleProcessing(true));

	Xhr.couponAdd(eventId, hash).then((resp) => {
		dispatch({
			type : ACTIONS.COUPON.UPDATE,
			data : resp.data
		});

		dispatch(makeBet(type, data));
	});
};

export const nextCoupon = (type) => dispatch => {
	Xhr.couponNext(type).then((resp) => dispatch({
		type : ACTIONS.COUPON.UPDATE,
		data : resp.data
	}));
};

export const prevCoupon = (type) => dispatch => {
	Xhr.couponPrev(type).then((resp) => dispatch({
		type : ACTIONS.COUPON.UPDATE,
		data : resp.data
	}));
};

export const clearCoupon = (type) => dispatch => {
	Xhr.couponClear(type).then((resp) => {
			if ( resp.status === 'ok' ) {
				dispatch({
					type : ACTIONS.COUPON.UPDATE,
					data : {}
				});
			}
		}
	);
};

export const delCoupon = (type, eventId) => dispatch => {
	Xhr.couponDel(type, eventId).then((resp) => dispatch({
		type : ACTIONS.COUPON.UPDATE,
		data : resp.data
	}));
};

export const setGoldbet = (gold, type, system = 0) => dispatch => {
	Xhr.setGoldBet(gold, type, system = 0).then((resp) => dispatch({
		type : ACTIONS.COUPON.UPDATE,
		data : resp.data
	}));
};

export const setLiveOpt = (option) => dispatch => {
	Xhr.setLiveOpt(option).then((resp) => dispatch({
		type : ACTIONS.COUPON.CHANGE_LIVE_OPT,
		data : resp.data
	}));
};

export const makeBet = (type, data) => dispatch => {
	Xhr.makeBet(type, data).then((resp) => {
		if ( resp.status === 'ok' ) {
			const {amount, currency} = resp.data.bet_data;
			let message = _.has(resp.data, 'messages') ? resp.data.messages.join(',') : '';
			message = message.replace('%amount%', amount).replace('%currency%', currency);

			toast.success(message);
		}

		dispatch({
			type : ACTIONS.COUPON.UPDATE,
			data : resp.data
		});

		// обновляем бабло
		// dispatch(getCash());

		// останавливаем процесс для ставки в один клик (если это ставка в один клик)
		dispatch(toggleProcessing(false));
	});
};

export const makeLineBet = (data) => dispatch => {
	Xhr.makeLineBet(data).then((resp) => {
		const messages = _.has(resp.data, 'messages') ? resp.data.messages.join(', ') : '';
		_.has(resp, 'status') && resp.status === 'ok' ? toast.success(messages) : toast.error(messages);

		dispatch({
			type : ACTIONS.COUPON.UPDATE,
			data : resp.data
		});

		// dispatch(getCash());
	});
};
import ACTIONS from "../constants/actions";
import {clearCoupon} from "../coupon/actions";

export const oneclickToggle = () => dispatch => {
	dispatch(clearCoupon('live'));
	dispatch({type:ACTIONS.ONECLICK.TOGGLE});
};

export const oneclickChangeAmount = (amount) => dispatch => {
	dispatch({type:ACTIONS.ONECLICK.CHANGE_AMOUNT, data : amount});
};

export const toggleProcessing = (isStart = false) => dispatch => {
	if (isStart) {
		dispatch({type:ACTIONS.ONECLICK.START_PROCESSING});
	}
	else {
		dispatch({type:ACTIONS.ONECLICK.STOP_PROCESSING});
	}
};
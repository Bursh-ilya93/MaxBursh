import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getPayments = (period) => dispatch => {
	Xhr.paymentHistory(period).then((resp) => dispatch({
		type : ACTIONS.PAYMENTS.GET_HISTORY,
		data : resp.data,
	}));
};

export const cancelPayment = (payment_id) => dispatch => {
	Xhr.paymentCancel(payment_id).then((resp) => dispatch({
		type : ACTIONS.PAYMENTS.CANCEL,
		data : resp.data,
	}));
};
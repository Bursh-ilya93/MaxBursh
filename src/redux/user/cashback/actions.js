import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getCashBack = () => dispatch => {
    dispatch({type: ACTIONS.USER.CASHBACK.FETCHING});

    Xhr.getCashBack().then((resp) => {
        dispatch({
            type : ACTIONS.USER.CASHBACK.GET_SUCCESS,
            data : resp.data,
        });
    }).catch(err => {
        dispatch({
            type : ACTIONS.USER.CASHBACK.FAILURE_GET,
            data : err
        });
    });
};

export const payCashBack = () => dispatch => {
    dispatch({type: ACTIONS.USER.CASHBACK.FETCHING});

    Xhr.payCashBack().then((resp) => {
        dispatch({
            type : ACTIONS.USER.CASHBACK.PAY_SUCCESS,
            data : resp.data,
        });
    }).catch(err => {
        dispatch({
            type : ACTIONS.USER.CASHBACK.FAILURE_PAY,
            data : err
        });
    });
};

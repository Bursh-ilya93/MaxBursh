import ACTIONS from "../../constants/actions";

const initState = {
    loading   : false,
    value     : {
        date   : '',
        logs   : [],
        result : 0
    },
    isNeedPay : false,
    messages  : {
        success : [],
        errors  : []
    }
};

export default function userCachBack(state = initState, action) {
    switch (action.type) {
        case ACTIONS.USER.CASHBACK.FETCHING:
            return {...state, loading : true};
        case ACTIONS.USER.CASHBACK.GET_SUCCESS:
            const isNeedPay = +action.data.result !== 0;
            return {...state, value : action.data, isNeedPay, loading : false};
        case ACTIONS.USER.CASHBACK.PAY_SUCCESS:
            return {...state, messages : {...state.messages, success : action.data}};
        case ACTIONS.USER.CASHBACK.FAILURE_PAY:
            return {...state, messages : {...state.messages, errors : action.data}};
        default:
            return state;
    }
}
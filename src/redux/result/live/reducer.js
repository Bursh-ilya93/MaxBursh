import ACTIONS from "../../constants/actions";

const  initState = {
    fetching       : false,
    isLoading      : false,
    sports         : [],
    leagues        : {},
    events         : {},
    moment         : new Date(),
};

export default function resultLive(state = initState, action) {
    switch (action.type) {
        case ACTIONS.RESULT.FETCHING:
            return {...state, fetching: true};
        case ACTIONS.RESULT.GET_LIVE:
            return {...state, ...action.data, fetching: false};
        default:
            return state;
    }
}

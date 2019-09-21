import ACTIONS from "../../constants/actions";

const initialState = {
    site     : [],
    sport    : [],
    analyst  : [],
    fetching : true
};

export default function news(state = initialState, action) {
    switch ( action.type ) {
        case ACTIONS.NEWS.RECEIVE_PROPS: {
            const newState = {
                [action.newsType] : action.data.news,
                fetching          : false
            };

            return Object.assign({}, {...state, ...newState});
        }
        default:
            break;
    }

    return state;
}
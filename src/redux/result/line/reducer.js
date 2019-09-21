import moment from "moment";
import ACTIONS from "../../constants/actions";

const initialState = {
    popular        : [2, 5, 7, 10, 3, 1, 4],
    fetching       : false,
    isFilterActive : false,
    isLoading      : false,
    sports         : [],
    leagues        : [],
    events         : {},
    moment         : new Date(),

    activeDop            : [],
    selectedSports       : [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.RESULT.FETCHING:
            return {...state, fetching: true};
        case ACTIONS.RESULT.GET_LINE:
            return {...state, fetching: false, ...action.data};
        case ACTIONS.RESULT.CHANGE_SELECTED_SPORT:
            const {selectedSports} = state;
            const index = selectedSports.indexOf(action.id);
            if (index === -1) {
                selectedSports.push(action.id);
            } else {
                selectedSports.splice(index, 1);
            }
            return {...state, selectedSports: [...selectedSports]};

        case ACTIONS.RESULT.RESET_ALL_SELECTED_FILTERS:
            return {...state, selectedSports: []};
        case ACTIONS.RESULT.ALL_CHECKED_FILTERS:
            const ids = state.sports.map(sport => sport.id);
            return {...state, selectedSports: ids};
        case ACTIONS.RESULT.CHANGE_CHECKED_DATA:
            return {...state, moment : action.moment};
        case ACTIONS.RESULT.TOGGLE_ADD: {
            const {activeDop} = state;
            const index = activeDop.indexOf(action.id);
            if (index === -1) {
                activeDop.push(action.id);
            } else {
                activeDop.splice(index, 1);
            }
            return {...state, activeDop: [...activeDop]};
        }
        case ACTIONS.RESULT.INIT_STATE:
            const {data} = action;
            return {...state, selectedSports: [...data]};
        default:
            return {...state};
    }
}
import ACTIONS from "../../constants/actions";
import Xhr from "../../../helpers/Xhr";
import moment from "moment";
import {convertFetchMaraphonResults} from "./converter";

export const toogleAdd = (id) => dispatch => {
    dispatch({
        type: ACTIONS.RESULT.TOGGLE_ADD,
        id
    });
};

export const fetchSportsFilter = () => dispatch => {
    dispatch({type: ACTIONS.RESULT.FETCHING});
    Xhr.getSportsForResult().then((resp) => {
        dispatch({
            type : ACTIONS.RESULT.GET_LINE,
            data : resp.data
        });
        dispatch(initSelected(resp.data.sports.map(s => s.id)));
    }).catch(err => {
        console.log(err);
    });
};

export const fetchResult = (time) => dispatch => {
    dispatch({type: ACTIONS.RESULT.FETCHING});
    let date = moment(time).format('YYYY-MM-DD');
    Xhr.resultLine(date).then((resp) => {
        dispatch({
            type : ACTIONS.RESULT.GET_LINE,
            data : resp.data
        });
    });
};

export const selectSportResultLine = (id) => dispatch => {
    dispatch({
        type : ACTIONS.RESULT.CHANGE_SELECTED_SPORT,
        id
    });
};

export const resetSelectedSport = () => dispatch => {
    dispatch({
        type : ACTIONS.RESULT.RESET_ALL_SELECTED_FILTERS,
    });
};


export const showAllSport = () => dispatch => {
    dispatch({
        type : ACTIONS.RESULT.ALL_CHECKED_FILTERS,
    });
};

export const changeDate = (moment) => dispatch => {
    dispatch({
        type : ACTIONS.RESULT.CHANGE_CHECKED_DATA,
        moment
    });
};

export const fetchResultsFromMaraphon = (time, sports) => dispatch => {
    if (!sports.length) return;

    dispatch({type: ACTIONS.RESULT.FETCHING});
    let date = moment(time).format('YYYY-MM-D');

    Xhr.getResultLine(date, sports.join('-')).then(resp => {
        dispatch({
            type : ACTIONS.RESULT.GET_LINE,
            data : convertFetchMaraphonResults(resp)
        });
    });
};

export const initSelected = (sports) => dispatch => {
    dispatch({
        type : ACTIONS.RESULT.INIT_STATE,
        data : sports
    });
};

export const changeDateAsync = (data, idsSports) => dispatch => {
    dispatch(changeDate(data));
    dispatch(fetchResultsFromMaraphon(data, idsSports));
};
import ACTIONS from "../../constants/actions";
import Xhr from "../../../helpers/Xhr";
import {formatData} from "./converter";

export const fetchResultsLive = () => dispatch => {
    dispatch({type: ACTIONS.RESULT.FETCHING});

    Xhr.resultLive().then(resp => {
        dispatch({
            type : ACTIONS.RESULT.GET_LIVE,
            data : formatData(resp.data)
        });
    });
};

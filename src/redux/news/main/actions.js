import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const getNews = (type, limit) => dispatch => {
    Xhr.getLastNews(type, limit).then((resp) => dispatch({
        type     : ACTIONS.NEWS.RECEIVE_PROPS,
        data     : resp.data || [],
        newsType : type
    }));
};

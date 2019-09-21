import Xhr from "../../../helpers/Xhr";
import ACTIONS from "../../constants/actions";

export const loadPassport = (files) => dispatch => {
    const fd = new FormData();
    Object.values(files).forEach((file, i) => {
        fd.append(`photo${i}`, file);
    });

    dispatch({
        type : ACTIONS.USER.UPLOAD_PASSPORT.REQUEST,
    });

    Xhr.loadPassport(fd).then((resp) => {
        dispatch({
            type : ACTIONS.USER.UPLOAD_PASSPORT.SUCCESS,
            data : resp.data,
        });
    }).catch(err => {
        dispatch({
            type : ACTIONS.USER.UPLOAD_PASSPORT.FAILURE,
            data : err
        });
    });
};

export const setImages = (data) => dispatch => {
    dispatch({
        type: ACTIONS.USER.SET_IMAGES,
        data
    });
};
import ACTIONS from "../../constants/actions";

const initState = {
    img              : [],
    files            : [],
    loading          : false,
    isLoadedPassport : false,
    messages         : {}
};

export default function data(state = initState, action) {
    switch (action.type) {
        case ACTIONS.USER.SET_IMAGES: {
            const {img, file, count} = action.data;
            return {...state, img : [...state.img, img], files : [...state.files, file]}
        }

        default:
            return state;
    }
}
import ACTIONS from "../../constants/actions";

export const selectLiveSport = (id) => dispatch => {
	dispatch({
		type : ACTIONS.LIVE.TOOLBAR.SELECT_SPORT,
		id
	})
};

export const toggleIsFavorite = () => dispatch => {
	dispatch({
		type : ACTIONS.LIVE.TOOLBAR.TOGGLE_IS_FAVORITE
	})
};
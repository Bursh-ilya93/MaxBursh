import ACTIONS from "../constants/actions";

export const addFavorite = () => dispatch => {
	dispatch({
		type          : '',
		data          : '',
		favorite_type : ''
	})
};

export const toggleFavorite = (data, favorite_type) => (dispatch, getState) => {
	dispatch({
		type          : ACTIONS.FAVORITE.TOGGLE,
		favorite_type : favorite_type,
		data          : data,
	})
};
import ACTIONS from "../constants/actions";
import ObjectHelper from "@helpers/ObjectHelper";

const initialState = {
	events  : {},
	sports  : {},
	leagues : {}
};

export default function data(state = initialState, action) {
	switch ( action.type ) {
		case ACTIONS.FAVORITE.TOGGLE: {
			const {data, favorite_type} = action;

			const out = ObjectHelper.toggle({...state[favorite_type]}, data);
			return {
				...state,
				[favorite_type] : out,
			}
		}
	}

	return state;
}
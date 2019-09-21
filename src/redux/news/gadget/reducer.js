import ACTIONS from "../../constants/actions";

const defaultState = {
	fetching: false,
	news: [],
	titles: {
		0: {
			title: 'Новости спорта',
			link: '/sport'
		},
		1: {
			title: 'Новости сайта',
			link: '/site'
		}
	}
};

export function gadget(state = defaultState, action) {
	switch (action.type) {
		case ACTIONS.NEWS.FETCHING:
			return {...state, fetching: !state.fetching};
		case ACTIONS.NEWS.UPDATE:
			return {...state, news: action.data.news};
		default:
			return state;
	}
}
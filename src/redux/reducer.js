import { combineReducers } from 'redux';
import auth from "./auth/reducer";
import user from "./user/reducer";
import line from "./line/reducer";
import news from "./news/reducer";
import live from "./live/reducer";
import data from "./data/reducer";
import popular from "./popular/reducer";
import result from "./result/reducer";
import about from "./about/reducer";
import bonus from "./bonuses/reducer";
import coupon from "./coupon/reducer";
import oneclick from "./oneclick/reducer";
import favorites from "./favorites/reducer";

export default combineReducers({
	auth,
	user,
	line,
	news,
	live,
	data,
	popular,
	result,
	about,
	bonus,
	coupon,
	oneclick,
	favorites,
})
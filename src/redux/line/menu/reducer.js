import {combineReducers} from "redux";
import main from "./main/reducer";
import popular from "./popular/reducer";

export default combineReducers({
	main,
	popular,
});
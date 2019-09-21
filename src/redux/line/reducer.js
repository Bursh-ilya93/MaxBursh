import {combineReducers} from "redux";
import menu from "./menu/reducer";
import main from "./main/reducer";

export default combineReducers({
	menu,
	main
});
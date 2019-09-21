import {combineReducers} from "redux";
import {gadget} from './gadget/reducer'
import main from './main/reducer'

export default combineReducers({
	gadget,
	main
});
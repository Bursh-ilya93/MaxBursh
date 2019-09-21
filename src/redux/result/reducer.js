import resultLine from "./line/reducer";
import resultLive from "./live/reducer";
import {combineReducers} from "redux";


export default combineReducers({
    resultLine,
    resultLive
});
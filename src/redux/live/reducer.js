import {combineReducers} from "redux";
import allEvents from "./allEvents/reducer";
import toolbar from "./toolbar/reducer";
import {oneEvent} from "./oneEvent/reducer";


export default combineReducers({
    oneEvent,
    allEvents,
    toolbar
});
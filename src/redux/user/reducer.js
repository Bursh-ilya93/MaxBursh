import {combineReducers} from "redux";
import main from './main/reducer';
import history_operations from './history-operations/reducer';
import history_payments from './history-payments/reducer';
import history_session from './history-session/reducer';
import cashback from './cashback/reducer';
import bonus from './history-bonus/reducer';
import data from './data/reducer';

export default combineReducers({
    main,
    history_operations,
    history_payments,
    history_session,
    cashback,
    bonus,
    data,
});
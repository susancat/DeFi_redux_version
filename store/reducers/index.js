//combine the reducers here
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import balanceReducer from "./balanceReducer";
import balanceHistoryReducer from "./balHistoryReducer";

export default combineReducers({
  accountState: accountReducer,
  balanceState: balanceReducer,
  balHisState: balanceHistoryReducer
});

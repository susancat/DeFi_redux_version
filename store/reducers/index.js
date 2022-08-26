//combine the reducers here
import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import balanceReducer from "./balanceReducer";
import balanceHistoryReducer from "./balHistoryReducer";
import priceReducer from "./priceReducer";

export default combineReducers({
  accountState: accountReducer,
  balanceState: balanceReducer,
  priceState: priceReducer,
  balHisState: balanceHistoryReducer
});

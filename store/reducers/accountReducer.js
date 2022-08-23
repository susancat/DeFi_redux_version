import { FETCH_ACCOUNT } from "../actions/types";

//if you want multiple reducer you can add another reducer here and exported to combineReducer
const initialState = null;
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT:
      return action.payload || state 
    default:
      return state;
  }
};

export default accountReducer;

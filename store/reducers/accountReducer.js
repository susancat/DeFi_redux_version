import { FETCH_ACCOUNT } from "../actions/types";

const initialState = "no account"
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT:
      return action.payload  
    default:
      return state;
  }
};

export default accountReducer;

import { FETCH_BALANCE } from "../actions/types";

const initialState = "";
const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BALANCE:
      return action.payload || state;
    default:
      return state;
  }
};

export default balanceReducer;
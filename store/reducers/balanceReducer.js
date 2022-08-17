import { FETCH_BALANCE } from "../actions/types";

const initialState = "no balance"
const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BALANCE:
      return action.payload;
    default:
      return state;
  }
};

export default balanceReducer;
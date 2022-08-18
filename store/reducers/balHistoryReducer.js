import { FETCH_BALHISTORY } from "../actions/types";

const initialState = "Loading..."
const balanceHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BALHISTORY:
      return action.payload || state;
    default:
      return state;
  }
};

export default balanceHistoryReducer;
import { FETCH_PRICE } from "../actions/types";

const initialState = 0;
const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRICE:
      return action.payload || state;
    default:
      return state;
  }
};

export default priceReducer;
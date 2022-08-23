import { FETCH_ACCOUNT, FETCH_BALANCE, FETCH_BALHISTORY} from "./types";
import { fetchAccount, connectAccount, disconnect, fetchBalance, connectForBalance, postBalanceHistory } from "../../connection/index";
import axios from 'axios';

//fetch data here, if fetch from server-side, use axios
export const getAccount = () => async (dispatch) => {
  const account = await fetchAccount();
  try {
    dispatch({
        type: FETCH_ACCOUNT,
        payload: account,
    });
  } catch (err) {
      console.log(err)
  }
};

export const grabAccount = () => async (dispatch) => {
  const account = await connectAccount();
  try {
    dispatch({
        type: FETCH_ACCOUNT,
        payload: account,
    });
  } catch (err) {
      console.log(err)
  }
};

export const disconnectAccount = () => async (dispatch) => {
  const account = await disconnect();
  try {
    dispatch({
      type: FETCH_ACCOUNT,
      payload: account,
    });
  } catch (err) {
      console.log(err)
  }
}

export const getBalance = () => async (dispatch) => {
  const balance = await fetchBalance();
  try {
    dispatch({
      type: FETCH_BALANCE,
      payload: balance,
    });
  } catch (err) {
      console.log(err)
  }
};

export const grabBalance = () => async (dispatch) => {
  const balance = await connectForBalance();
  try {
    dispatch({
      type: FETCH_BALANCE,
      payload: balance,
    });
  } catch (err) {
      console.log(err)
  }
};
//cause post and fetch balance history will interact with the same api, they can use same type
export const postBalHistory = () => async (dispatch) => {
  const account = await fetchAccount();
  const balanceRecord = await postBalanceHistory();
  const res = await axios.post('/api/records/', { 
    account,
    balances: balanceRecord
  })
  try {
    dispatch({
      type: FETCH_BALHISTORY,
      payload: res.data,
    });
  } catch (err) {
      console.log(err)
  }
};

export const fetchBalHistory = () => async (dispatch) => {
  const account = await fetchAccount();
  const res = await axios.get('/api/records/', { 
    params:
    { 
      account
    }
  })
  // console.log(res.data)
  try {
    dispatch({
      type: FETCH_BALHISTORY,
      payload: res.data.balances
    });
  } catch (err) {
      console.log(err)
  }
};


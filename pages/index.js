import { useDispatch, useSelector } from "react-redux";
import { getAccount, getBalance, postBalHistory } from "../store/actions";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.accountState);
  const balanceData = useSelector((state) => state.balanceState);
  const balanceHistory = useSelector((state) => state.balHisState);

  const account = accountData;
  const balance = balanceData;
  const balHistory = balanceHistory;
  // const balHistory = 
  useEffect(() => {
    dispatch(getAccount());
    dispatch(getBalance());
    dispatch(postBalHistory());
  }, [dispatch]);
  return (
    <>
      <h3>Your account: {account}</h3>
      <h3>Balance: {balance} ETH</h3>
      <h3>Balance history: {balHistory}</h3>
    </>
  );
}

import { useDispatch } from "react-redux";
import { getAccount, getBalance, postBalHistory } from "../store/actions";
import { useEffect } from "react";
import SwapCard from '../components/SwapCard';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      dispatch(getAccount());
      dispatch(getBalance());
      dispatch(postBalHistory());
    });
  }, [dispatch]);
  return (
    <>
      <SwapCard />
    </>
  );
}
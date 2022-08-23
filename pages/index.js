import { useDispatch } from "react-redux";
import { getAccount, getBalance, postBalHistory } from "../store/actions";
import { useEffect } from "react";
import Nav from '../components/Nav';
import Transfer from '../components/Transfer';

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
      <Nav />
      <Transfer />
    </>
  );
}

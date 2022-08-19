import { useDispatch, useSelector } from "react-redux";
import { getAccount, getBalance, postBalHistory } from "../store/actions";
import { useEffect } from "react";
import Nav from '../components/Nav';
import Transfer from '../components/Transfer';

export default function Home() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const balHistory = useSelector((state) => state.balHisState);

  useEffect(() => {
    dispatch(getAccount());
    dispatch(getBalance());
    dispatch(postBalHistory());
  }, [dispatch]);
  return (
    <>
      <Nav />
      <Transfer />
    </>
  );
}

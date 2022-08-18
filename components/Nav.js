import { Button, ButtonGroup, Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { grabAccount, grabBalance, postBalHistory } from '../store/actions';

const Nav = (props) => {
    const dispatch = useDispatch();
  const accountData = useSelector((state) => state.accountState);
  const balanceData = useSelector((state) => state.balanceState);
  const balanceHistory = useSelector((state) => state.balHisState);

  const account = accountData;
  const balance = balanceData;
  const balHistory = balanceHistory;

  const connect = async() => {
    await dispatch(grabAccount());
    await dispatch(grabBalance());
    await dispatch(postBalHistory());
  }
    return (
        <>
        <Navbar>
          <Container>
          <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <div>
                  {account ?
                  <ButtonGroup size="lg" className="mb-2">
                    <Button variant="light" disabled>{balance}&nbsp;<i className="fa-brands fa-ethereum"></i></Button>
                    <Button 
                      variant="secondary"
                      onClick={() => {setModalShow(true)}}
                      >
                        {account.slice(0,5).concat('...').concat(account.slice(-4))}
                      </Button>
                  </ButtonGroup>
                  :
                  <Button variant="light" size="lg" onClick={connect}>Connect</Button>
                  }
                </div>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {/* <Transfer 
          account={account} 
          balance={balance} 
          web3={web3} 
          getBalance={(balance) => setBalance(balance)} />
        <AccountDetails 
          account={account}
          show={modalShow} 
          onHide={() => setModalShow(false)} 
        /> */}
        </>
      );
    }
    
    export default Nav;
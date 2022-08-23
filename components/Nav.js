import { useState, useEffect } from "react";
import { Button, ButtonGroup, Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { grabAccount, grabBalance, postBalHistory } from '../store/actions';
import AccountDetails from './accountDetails';

const Nav = () => {
  const [modalShow, setModalShow] = useState(false);
  
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const balHistory = useSelector((state) => state.balHisState);

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
        <AccountDetails 
          account={account}
          show={modalShow} 
          onHide={() => setModalShow(false)} 
        />
        </>
      );
    }
    
    export default Nav;
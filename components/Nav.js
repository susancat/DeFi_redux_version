import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Container, Navbar, Nav, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getAccount, grabAccount, getBalance, grabBalance, postBalHistory } from '../store/actions';
import AccountDetails from './accountDetails';

const NavBar = () => {
  const [modalShow, setModalShow] = useState(false);
  
  const router = useRouter();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.accountState);
  const balance = useSelector((state) => state.balanceState);
  const balHistory = useSelector((state) => state.balHisState);

  useEffect(() => {
    async () => {
      await dispatch(getAccount());
      await dispatch(getBalance());
      await dispatch(postBalHistory());
    }
  },[dispatch])

  const connect = async() => {
    await dispatch(grabAccount());
    await dispatch(grabBalance());
    await dispatch(postBalHistory());
  }

  return (
    <>
      <Navbar>
        {/* <Container> */}
          <Navbar.Collapse className="">
            <Col lg={4}>
              <Navbar.Brand href="/" className="ms-3">Home</Navbar.Brand>
            </Col>
            <Col lg={4}>
              <Nav justify size="lg" variant="tabs" className="me-5" style={{fontSize:'1.2rem'}}>
                <Nav.Item>
                  <Nav.Link href="/" className={router.pathname == "/" ? "active" : ""}>Transfer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/swap" eventKey="Swap" className={router.pathname == "/swap" ? "active" : ""}>Swap</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Staking" disabled>Staking</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>
                    NFT
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col lg={4}>
              <Navbar.Text>
                <div className="d-flex justify-content-end me-3">
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
            </Col>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
    <AccountDetails 
      account={account}
      show={modalShow} 
      onHide={() => setModalShow(false)} 
    />
    </>
  );
}
    
export default NavBar;
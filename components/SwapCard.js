import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import { getBalance, fetchPrice } from "../store/actions";
import Popup from "./popup";

const SwapCard = () => {
    const [tokenInput, setTokenInput] = useState("ETH");
    const [tokenOutput, setTokenOutput] = useState("USDC");
    const [amountInput, setAmountInput] = useState(0);
    const [amountOutput, setAmountOutput] = useState(0);
    const [variant, setVariant] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [rate, setRate] = useState(1500);
//output amount should be calculated according to a real-time exchange rate
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.balanceState);
    const price = useSelector((state) => state.priceState);
    useEffect(() => {
        dispatch(getBalance());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchPrice());
    },[amountOutput])

    const handleOutputAmount = async(e) => {
        setAmountInput(Number(e.target.value));
        setAmountOutput(Number(e.target.value) * rate);
        //if use setAmountOutput(amountInput * rate), it will change one step behind
    }

    return (
        <>
        <Row className="mt-2 justify-content-end" style={{height: "5rem"}}>
            <Popup variant={variant} setShow={setShow} show={show} message={message} />
        </Row>
        <Row className="mt-5 justify-content-center">
            <Col xs={4}>
                <Card className="bg-light text-white">
                    <Form className='p-2'>
                        <Form.Text className="text-muted">
                            <h4 className='mt-3 ms-2'>Swap</h4>
                        </Form.Text>
                        <Form.Group className="mb-3 mt-3" controlId="">
                            <Row>
                                <Col xs={8}>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="0" 
                                        style={{height: '3rem'}} 
                                        onChange={handleOutputAmount}
                                        size="lg"
                                        required
                                    />
                                </Col>
                                <Col xs={4}>
                                    <Form.Select id="token1" size="lg" style={{height: '3rem'}} onSelect={event => setTokenInput(event.target.value)}>
                                        <option value="eth">ETH</option>
                                        <option value="usdc">USDC</option>
                                    </Form.Select>
                                </Col>                            
                            </Row>
                            <Form.Text className="text-muted">
                            <h6 className='mt-2 ms-2 d-flex justify-content-start'>MAX: {balance}&nbsp;<i className="fa-brands fa-ethereum"></i></h6>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 mt-3" controlId="">
                            <Row>
                            <Col xs={8}>
                                <Form.Control 
                                    type="text" 
                                    size="lg"
                                    style={{height: '3rem'}} 
                                    onChange={handleOutputAmount}
                                    value={amountOutput}
                                    required
                                />
                            </Col>
                            <Col xs={4}>
                                <Form.Select id="token2" size="lg" style={{height: '3rem'}} onSelect={event => setTokenOutput(event.target.value)}>
                                    <option value="usdc">USDC</option>
                                    <option value="eth">ETH</option>
                                </Form.Select>
                            </Col>
                            </Row>       
                        </Form.Group>
                        {
                            amountInput !== 0 && amountOutput !== 0 && amountInput <= balance ?
                            <Row><h6 className="text-dark ms-2">1 USDC = {price} ETH</h6></Row> :
                            <Row></Row>
                        }
                        {
                        amountInput && amountOutput && amountInput <= balance ?
                            <Button 
                                variant="primary" 
                                size="lg"
                                className="mb-2" 
                                style={{width:"100%", borderRadius:'15px'}} 
                                // onClick={() => transfer()}
                            >Swap</Button>
                        :
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="mb-2" 
                                style={{width:"100%", borderRadius:'15px'}} 
                                disabled
                            >Select a token</Button>
                        }
                    </Form>
                </Card>
            </Col>
        </Row>
        </>
    );
}

export default SwapCard;
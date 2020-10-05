import React, { useState } from 'react';
import { Row, Button, Col, Container, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
// import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from '../App.Component/App';
import { SIGN_UP } from '../Apollo/mutations'


function Home() {
    const [signup, { loading, error }] = useMutation(SIGN_UP);

    const [showModalSignin, setShowModalSignin] = useState(false);
    const [showModalSignup, setShowModalSignup] = useState(false);

    const handleShowModalSignin = () => setShowModalSignin(true);
    const handleCloseModalSignin = () => setShowModalSignin(false);
    const handleShowModalSignup = () => setShowModalSignup(true);
    const handleCloseModalSignup = () => setShowModalSignup(false);

    const { register, handleSubmit, errors } = useForm();

    const submitSignup = handleSubmit( async ({ username, email, password }) => {
        console.log(username, ' : ', email, ' : ', password);
        
            const res = await signup({
                variables: { username, email, password }});

            console.log(typeof(res.data))
            if(res?.data?.signup){
                console.log(res?.data?.signup);
            }
        
    });

    console.log('Loading: ', loading);
    console.log('Error: ', error);

    return (
        <div className='Home'>
            <Container>
                <Row md={10}>
                    <Col>
                        <h1>ToDoList</h1>
                        <br />
                    </Col>
                    <Col>
                        <Button onClick={handleShowModalSignin}>Sign In</Button>
                        <Button onClick={handleShowModalSignup}>Sign Up</Button>
                    </Col>
                </Row>
            </Container>
            {/* Sign In Modal */}
            <Modal show={showModalSignin} onHide={handleCloseModalSignin}>
                <Modal.Header closeButton>Sign In</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text"></Form.Control>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password"></Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Sign In</Button><br />
                    <Button><a href='http://localhost:4000/auth/facebook'>Log In With Facebook</a></Button>
                </Modal.Footer>
            </Modal>

            {/* Sign In Modal */}
            <Modal show={showModalSignup} onHide={handleCloseModalSignup}>
                <Modal.Header closeButton>Sign Up</Modal.Header>
                <Modal.Body>
                    {/* <form onSubmit={submitSignup}>
                    <input name="email" ref={register} />
                    <input name="username" ref={register} />
                    <input type="password" name="password" ref={register} />
                    <button type="submit">Submit</button>
                </form> */}
                    <Form onSubmit={submitSignup}>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" name="email"
                            ref={register}>
                        </Form.Control>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type="text" name="username"
                            ref={register}></Form.Control>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" name="password"
                            ref={register}></Form.Control>
                        <Button type="submit">Sign Up</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button>Sign Up With Facebook</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;
import React, { useState } from 'react';
import { Row, Button, Col, Container, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
// import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { useHistory } from 'react-router-dom';;

import 'bootstrap/dist/css/bootstrap.min.css';

import App from '../App.Component/App';



function Home() {

    const history = useHistory();
    const [cookies, setCookie] = useCookies(['jwt']);

    const [showModalSignin, setShowModalSignin] = useState(false);
    const handleShowModalSignin = () => setShowModalSignin(true);
    const handleCloseModalSignin = () => setShowModalSignin(false);

    const [showModalSignup, setShowModalSignup] = useState(false);
    const handleShowModalSignup = () => setShowModalSignup(true);
    const handleCloseModalSignup = () => setShowModalSignup(false);

    const [logIn, setlogIn] = useState(true);
    const handleLogin = () => setlogIn(true);
    const handleLogOut = () => setlogIn(false);

    const { register, handleSubmit, errors } = useForm();

    const submitSignin = handleSubmit(async ({ email, password }) => {
        console.log(email, ' : ', password);
        const body = {
            email,
            password
        };
        const res = axios.post('http://localhost:5000/login', body)
            .then((response) => {
                const user = response.data.user;
                const token = response.data.token;
                console.log(token);
                console.log(user);
                handleCloseModalSignin();
                history.push('/app');
                handleLogin();
            })
            .catch((error) => {
                console.log(error);
            });
    })

    const submitSignup = handleSubmit(async ({ username, email, password }) => {
        console.log(username, ' : ', email, ' : ', password);
        const body = {
            username,
            email,
            password
        }
        axios.post('http://localhost:5000/register', body)
            .then((response) => {
                console.log(response);
                handleCloseModalSignup();
                handleLogin();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const submitSignOut = handleSubmit(() => {
        history.push('/');
        handleLogOut()
    });


    return (
        <div className='Home'>
            <Container>
                <Row md={10}>
                    <Col>
                        <h1>ToDoList</h1>
                        <br />
                    </Col>
                    {
                        logIn === false ? (
                            <Col>
                                <Button onClick={handleShowModalSignin}>Sign In</Button>
                                <Button onClick={handleShowModalSignup}>Sign Up</Button>
                            </Col>
                        ) : logIn === true ? (
                            <Col>
                                <Button onClick={submitSignOut}>Sign Out</Button>
                            </Col>
                        ) : null
                    }
                </Row>
            </Container>
            {/* Sign In Modal */}
            <Modal show={showModalSignin} onHide={handleCloseModalSignin}>
                <Modal.Header closeButton>Sign In</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitSignin}>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="text" name="email"
                            ref={register}></Form.Control>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" name="password"
                            ref={register}></Form.Control>
                        <Button type="submit">Sign In</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <br />
                    <Button><a href='http://localhost:4000/auth/facebook'>Log In With Facebook</a></Button>
                </Modal.Footer>
            </Modal>

            {/* Sign In Modal */}
            <Modal show={showModalSignup} onHide={handleCloseModalSignup}>
                <Modal.Header closeButton>Sign Up</Modal.Header>
                <Modal.Body>
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
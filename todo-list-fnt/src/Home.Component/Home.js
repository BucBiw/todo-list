
import React, { useState } from 'react';
import { Row, Button, Col, Container, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
// import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

// import 'bootstrap/dist/css/bootstrap.min.css';



function Home() {

    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const [showModalSignin, setShowModalSignin] = useState(false);
    const handleShowModalSignin = () => setShowModalSignin(true);
    const handleCloseModalSignin = () => setShowModalSignin(false);

    const [showModalSignup, setShowModalSignup] = useState(false);
    const handleShowModalSignup = () => setShowModalSignup(true);
    const handleCloseModalSignup = () => setShowModalSignup(false);

    const [logIn, setlogIn] = useState(false);
    const handleLogin = () => setlogIn(true);
    const handleLogOut = () => setlogIn(false);

    const { register, handleSubmit, errors } = useForm();

    const submitSignin = handleSubmit(async ({ email, password }) => {
        console.log(email, ' : ', password);
        const body = {
            email,
            password
        };
        axios.post('http://localhost:5000/login', body)
            .then((response) => {
                const token = response.data.token;
                console.log(token);
                setCookie('jwt', token);
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
                const token = response.data.token;
                setCookie('jwt', token);
                handleCloseModalSignup();
                history.push('/app');
                handleLogin();
            })
            .catch((error) => {
                console.log(error);
            });
    }); 

    const responseFacebook = (response) => {
        console.log("Res---->", response);
    }

    const signInByFacebook = handleSubmit(async () => {
        axios.get('http://localhost:5000/auth/facebook').then((response) => {
            console.log(response);
            const token = response.data.token;
            setCookie('jwt', token);
            history.push('/app');
            handleLogin();
        });
    }); 

    const submitSignOut = handleSubmit(() => {
        const cookie = cookies;
        const token = cookie.jwt
        removeCookie('jwt');
        console.log('token: ',token);
        const body = {
            token: token
        };
        axios.post('http://localhost:5000/logout', body).then((response) => {
            console.log(response);
        });
        history.push('/');
        handleLogOut();
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
                    {/* <FacebookLogin
                        appId="895031030904400"
                        autoLoad={false}
                        fields="id, displayName"
                        onClick={<button>FB</button>}
                        scope="id, email, displayname"
                        callBack={responseFacebook}
                        icon="fa-facebook"
                    /> */}
                    <button id="SocialLogin" ><a href="http://localhost:5000/auth/facebook">Login With Facebook</a></button>
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
                    <Button className="SocielLogin" onClick={signInByFacebook}>Sign Up With Facebook</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Home;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Button, Col, Container, Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { ErrorMessage } from '@hookform/error-message';
import styled from 'styled-components'
// import 'bootstrap/dist/css/bootstrap.min.css';

import { signIn, signOut } from '../Context/action';
import getCookies from '../getCookies';
export const StyledError = styled.p`
  margin: 0;
  padding: 0;
  color: red;
  font-size: 1.3rem;
`

function Home() {
    

    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
    const cookie = getCookies('jwt');

    const [showModalSignin, setShowModalSignin] = useState(false);
    const handleShowModalSignin = () => setShowModalSignin(true);
    const handleCloseModalSignin = () => setShowModalSignin(false);

    const [showModalSignup, setShowModalSignup] = useState(false);
    const handleShowModalSignup = () => setShowModalSignup(true);
    const handleCloseModalSignup = () => setShowModalSignup(false);

    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm();

    if(cookie){
        dispatch(signIn());
    }

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
                dispatch(signIn(response.data.user));
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
                dispatch(signIn(response.data.user));
            })
            .catch((error) => {
                console.log(error);
            });
    });

    // const responseFacebook = (response) => {
    //     console.log("Res---->", response);
    // }

    // const signInByFacebook = handleSubmit(async () => {
    //     axios.get('http://localhost:5000/auth/facebook').then((response) => {
    //         console.log(response);
    //         const token = response.data.token;
    //         setCookie('jwt', token);
    //         history.push('/app');
    //         handleLogin();
    //     });
    // }); 

    const submitSignOut = handleSubmit(() => {
        const cookie = cookies;
        const token = cookie.jwt
        removeCookie('jwt');
        console.log('token: ', token);
        const body = {
            token: token
        };
        axios.post('http://localhost:5000/logout', body).then((response) => {
            console.log(response);
        });
        history.push('/');
        dispatch(signOut());
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
                        isLoggedIn ? (
                            <Col>
                                <Button onClick={submitSignOut}>Sign Out</Button>
                            </Col>

                        ) : (
                                <Col>
                                    <Button onClick={handleShowModalSignin}>Sign In</Button>
                                    <Button onClick={handleShowModalSignup}>Sign Up</Button>
                                </Col>
                            )
                    }
                </Row>
            </Container>
            {/* Sign In Modal */}
            <Modal show={showModalSignin} onHide={handleCloseModalSignin}>
                <Modal.Header closeButton><h2>Sign In</h2></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitSignin}>
                        <Form.Label><h4>Email: </h4></Form.Label>
                        <Form.Control type="text" name="email"
                            ref={register({
                                required: "Email is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email is wrong Format"
                                }
                            })}></Form.Control>
                        <ErrorMessage errors={errors} name="email">
                            {({ message }) => <p className="error">{message}</p>}
                        </ErrorMessage>
                        <br />
                        <Form.Label><h4>Password: </h4></Form.Label>
                        <Form.Control type="password" name="password"
                            ref={register({
                                required: "Password is required.",
                                minLength: {
                                    value: 6,
                                    message: "You must be at least 6"
                                }
                            })}></Form.Control>
                        <ErrorMessage errors={errors} name="password">
                            {({ message }) => <StyledError>{message}</StyledError>}
                        </ErrorMessage>
                        <br />
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
                    {/* <button id="SocialLogin" ><a href="http://localhost:5000/auth/facebook">Login With Facebook</a></button> */}
                </Modal.Footer>
            </Modal>

            {/* Sign In Modal */}
            <Modal show={showModalSignup} onHide={handleCloseModalSignup}>
                <Modal.Header closeButton><h2>Sign Up</h2></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitSignup}>

                        <Form.Label><h4>Email: </h4></Form.Label>
                        <Form.Control type="text" name="email"
                            ref={register({
                                required: "Email is required.",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email is wrong Format"
                                }
                            })}>
                        </Form.Control>
                        <ErrorMessage errors={errors} name="email">
                            {({ message }) => <p className="error">{message}</p>}
                        </ErrorMessage>
                        <br />

                        <Form.Label><h4>Username: </h4></Form.Label>
                        <Form.Control type="text" name="username"
                            ref={register({
                                required: "Username is required.",
                                minLength: {
                                    value: 4,
                                    message: "You must be at least 4"
                                },
                                maxLength: {
                                    value: 60,
                                    message: "Username must more than 60"
                                }
                            })}></Form.Control>
                        <ErrorMessage errors={errors} name="username">
                            {({ message }) => <p className="error">{message}</p>}
                        </ErrorMessage>
                        <br />
                        <Form.Label><h4>Password: </h4></Form.Label>
                        <Form.Control type="password" name="password"
                            ref={register({
                                required: "Password is required.",
                                minLength: {
                                    value: 6,
                                    message: "You must be at least 6"
                                }
                            })}></Form.Control>
                        <ErrorMessage errors={errors} name="password">
                            {({ message }) => <p className="error">{message}</p>}
                        </ErrorMessage>
                        <br />
                        <Button type="submit">Sign Up</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className="SocielLogin" onClick={signInByFacebook}>Sign Up With Facebook</Button> */}
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Home;
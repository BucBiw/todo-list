import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApolloProvider } from '@apollo/client';
import { ErrorMessage } from '@hookform/error-message';

import { Modal } from './Modal/modal';
import { client } from '../apollo/client';

const Home = () => {
  const [isShownSignUp, setIsShownSignUp] = useState<boolean>(false);
  const toggleSignUp = () => setIsShownSignUp(!isShownSignUp);

  const [isShownSignIn, setIsShownSignIn] = useState<boolean>(false);
  const toggleSignIn = () => setIsShownSignIn(!isShownSignIn);

  const { register, errors, handleSubmit } = useForm<{ username: string; email: string; password: string}>();

  const contentSignUp = (<React.Fragment>
    <form>
      <label>Email: </label>
      <input type="text" name="email"
        ref={
          register({
            required: 'Email is Required.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email is Wrong format.'
            }
          })
        } />
      {/* <ErrorMessage errors={errors} name="email">
        {({ message }) => <p>{message}</p>}
      </ErrorMessage> */}
      <br /><br />
      <label>Username: </label>
      <input type="text" name="username"
        ref={
          register({
            required: 'Username is Required.',
            minLength: {
              value: 6,
              message: 'Username must be at least 6 charecters'
            },
            maxLength: {
              value: 60,
              message: 'Username must not more then 60 charecters'
            }
          })
        }
      /><br /><br />
      <label>Password: </label>
      <input type="password" name="password"
        ref={
          register({
            required: 'Password is Required.',
            minLength: {
              value: 6,
              message: 'Password mush more 6 charecters'
            },
            maxLength: {
              value: 60,
              message: 'Password mush least 60 charecters'
            }
          })
        }
      /><br /><br />
      <button type="submit">Sign Up</button><br/>
    </form>
    <button type="submit">Log in By Facebook</button>
  </React.Fragment>);

const contentSignIn = (<React.Fragment>
  <form>
    <label>Email: </label>
    <input type="text" name="email" /><br/><br/>
    <label>Password: </label>
    <input type="password" name="password" /><br/><br/>
    <button type="submit">Sign In</button><br/>
  </form>
  <button type="submit">Log in By Facebook</button>
</React.Fragment>);

  return (
    <div className="Home">
      <ApolloProvider client={client}>
        <h1>To Do List</h1>
        <button onClick={toggleSignIn}>Sign In</button>
        <button onClick={toggleSignUp}>Sign Up</button>
        <Modal isShown={isShownSignUp} hide={toggleSignUp} modalContent={contentSignUp} headerText="Sign Up" />
        <Modal isShown={isShownSignIn} hide={toggleSignIn} modalContent={contentSignIn} headerText="Sign Up" />
      </ApolloProvider>
    </div>
  );
};

export default Home;
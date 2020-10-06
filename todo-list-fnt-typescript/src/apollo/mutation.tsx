import {gql}  from '@apollo/client';

export const SIGN_UP = gql`
mutation SIGNUP($username: String!, $email: String!, $password: String!){
  signup(
    username: $username
    password: $email
    email: $password
  ){
    username
    id
    email
  }
}
`;
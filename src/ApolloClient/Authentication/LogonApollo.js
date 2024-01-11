// mutations.js
import { gql } from '@apollo/client';

export const REGISTER_MUTATION =  gql`
mutation Register($username : String! , $password: String! ) {
    addUser(username: $username , password: $password ){
        username
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password){
        token
        userId
        message
    }
  }
`;

export const GET_USER = gql`
{
    User{
    id
    username
    password
  }
}
`;

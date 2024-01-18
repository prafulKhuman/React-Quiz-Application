// mutations.js
import { gql } from '@apollo/client';

export const REGISTER_MUTATION =  gql`
mutation Register($username : String! , $password: String! ) {
  addUser(username: $username , password: $password ){
        username
    }
  }
`;

export const RESET_MUTATION =  gql`
mutation Register($id : String! ,$oldPassword : String! $password: String! ) {
  updateUser(id: $id , oldPassword: $oldPassword , password: $password ){
        password
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password){
        userId
        message
        token
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

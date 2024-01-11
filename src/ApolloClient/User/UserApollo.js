import { gql } from '@apollo/client';



export const GET_USER_CONDITION = gql`
  query GetUsers($id: String!) {
    User(id: $id) {
      id
      username
      password
    }
  }
`;



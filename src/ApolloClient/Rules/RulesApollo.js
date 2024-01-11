import { gql } from '@apollo/client';

export const GET_RULES = gql`
{
    Rules {
    id
    quizid
    quiz
    rules
    
  }
}
`;

export const GET_RULES_CONDITION = gql`
  query GetRules($quizid: String!) {
    Rules(quizid: $quizid) {
      id
      quizid
      quiz
      rules
    }
  }
`;



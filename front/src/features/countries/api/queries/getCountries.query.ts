import { gql } from 'graphql-request';

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
    }
  }
`;

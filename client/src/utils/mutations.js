import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!, $postcode: String!) {
  createUser(username: $username, email: $email, password: $password, postcode: $postcode) {
    token
    user {
      _id
      completedCards {
        businessId
        businessName
        stampsRequired
        visitCount
      }
      currentCards {
        businessId
        businessName
        stampsRequired
        visitCount
      }
      email
      postcode
      username
      savedOffers
    }
  }
}
`
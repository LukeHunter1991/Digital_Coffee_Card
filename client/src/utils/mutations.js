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
export const  USER_LOGIN = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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
            savedOffers
            username
            }
        }
    }
`

export const ADD_BUSINESS_USER = gql`
    mutation createBusiness($businessName: String!, $email: String!, $password: String!, $postcode: String!, $stampsRequired: Int!) {
        createBusiness(businessName: $businessName, email: $email, password: $password, postcode: $postcode, stampsRequired: $stampsRequired) {
            business {
            Offers
            _id
            businessName
            email
            postcode
            stampsRequired
            }
            token
        }
    }
`

export const BUSINESS_LOGIN = gql`
    mutation businessLogin($email: String!, $password: String!) {
  businessLogin(email: $email, password: $password) {
    business {
      Offers
      _id
      businessName
      email
      postcode
      stampsRequired
    }
    token
  }
}
`
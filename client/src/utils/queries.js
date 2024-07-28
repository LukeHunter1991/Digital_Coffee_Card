import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
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
`

export const BUSINESS_ME = gql`
    query businessMe {
        businessMe {
            Offers
            _id
            businessName
            email
            postcode
            stampsRequired
        }
    }
`
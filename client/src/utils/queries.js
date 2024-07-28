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
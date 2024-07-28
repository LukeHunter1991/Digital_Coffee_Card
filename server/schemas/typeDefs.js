const typeDefs = `
    type Offer {
        _id: ID!
        description: String!
        offerType: String!
        discount: String!
    }

    type Card {
    businessId: ID!
    visitCount: Int!
    businessName: String
    stampsRequired: Int
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        postcode: String!
        savedOffers: [ID]!
        currentCards: [Card]!
        completedCards: [Card]!
    }

    type Business {
        _id: ID!
        businessName: String!
        email: String!
        password: String!
        postcode: String!
        stampsRequired: Int!
        Offers: [ID]!
    }

    type Auth {
    token: String!
    user: User
    }

    type businessAuth {
    token: String!
    business: Business
    }


    type Query {
    business: [Business]
    offer: [Offer]
    user: [User]
    me: User
    businessMe: Business
    }

    type Mutation {
    createUser(username: String!, email: String!, password: String!, postcode: String!): Auth
    saveOffer(offerId: ID!): User
    deleteOffer(offerId: ID!): User
    login(email: String!, password: String!): Auth
    createBusiness(businessName: String!, email: String!, password: String!, postcode: String!, stampsRequired: Int!): businessAuth
    businessLogin(email: String!, password: String!): businessAuth
    addStamp(scannedId: String!): User
    redeemCard(businessId: String!): User
}
`

module.exports = typeDefs;
const typeDefs = `
    type Offer {
        _id: ID!
        description: String!
        offerType: String!
        stamps: Int!
    }
    
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        business: Boolean!
        postcode: String!
        savedOffers: [ID!]
    }

    type Auth {
    token: String!
    user: User
    }

    type Query {
    offer: [Offer]
    user: [User]
    me: User
    }

    type Mutation {
    createUser(username: String!, email: String!, password: String!, business: Boolean!, postcode: String!): Auth
    save(offerId: ID!): User
    deleteOffer(offerId: ID!): User
    login(email: String!, password: String!): Auth
}
`

module.exports = typeDefs;
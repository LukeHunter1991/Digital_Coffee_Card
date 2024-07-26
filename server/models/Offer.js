const {Schema, model} = require('mongoose');

// This is a subdocument schema for the offers. It is used as the schema for the User's 'savedOffers' array.
const offerSchema = new Schema({
    // Description for this offer to be shown to user. 
    description: {
        type: String,
        required: true,
      },
    // % off vs $ off
    offerType: {
        type: String,
        required: true,
    },
    // % or $ value of the discount
    discount: {
        type: String,
        required: true,
    },
})

const Offer = model('offer', offerSchema);

module.exports = Offer;

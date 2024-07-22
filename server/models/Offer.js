const {Schema, model} = require('mongoose');

// This is a subdocument schema for the offers. It is used as the schema for the User's 'savedOffers' array.
const offerSchema = new Schema({
    description: {
        type: String,
        required: true,
      },
    offerType: {
        type: String,
        required: true,
    },
    stamps: {
        type: Number,
        default: 8
    }
})

const Offer = model('offer', offerSchema);

module.exports = Offer;

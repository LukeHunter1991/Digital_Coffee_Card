const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const businessSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
      unique: true,
    },
    // Regex used to ensure email matches expected 
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Postcode to show relevant offers if specific location data not enabled
    postcode: {
      type: String,
      required: true,
    },
    stampsRequired: {
        type: Number,
        default: 8
    },
    // set savedOffers to be an array of data that adheres to the bookSchema
    Offers: [{ type: Schema.Types.ObjectId, ref: 'offer' }],

  },
  // Virtual needed for hashing business password below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual for hashing business password when new password created.
businessSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Validates password when business attempts log in
businessSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a business, we'll also get another field called `offerCount` with the number of offers they currently have saved
businessSchema.virtual('offerCount').get(function () {
  return this.Offers.length;
});

const Business = model('business', businessSchema);

module.exports = Business;

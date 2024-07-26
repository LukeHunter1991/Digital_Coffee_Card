const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema(
  {
    username: {
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
    // set savedOffers to be an array of data that adheres to the bookSchema
    savedOffers: [{ type: Schema.Types.ObjectId, ref: 'offer' }],
    currentCards: [
      {
        businessId: { type: Schema.Types.ObjectId, ref: 'business' },
        visitCount: { type: Number },
        businessName: { type: String },
        stampsRequired: { type: Number }
      }
    ],
    completedCards: [
      {
        businessId: { type: Schema.Types.ObjectId, ref: 'business' },
        visitCount: { type: Number },
        businessName: { type: String },
        stampsRequired: { type: Number }
      }
    ]
  },
  // Virtual needed for hashing user password below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual for hashing user password when new password created.
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Validates password when user attempts log in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `offerCount` with the number of offers they currently have saved
userSchema.virtual('offerCount').get(function () {
  return this.savedOffers.length;
});

const User = model('user', userSchema);

module.exports = User;

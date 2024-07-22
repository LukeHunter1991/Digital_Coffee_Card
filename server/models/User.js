const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const offerSchema = require('./Offer');

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
    // If true, treat as business user, else customer
    business: {
        type: Boolean,
        required: true,
      },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedOffers: [offerSchema],
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

const User = model('User', userSchema);

module.exports = User;

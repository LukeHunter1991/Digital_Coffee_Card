const { Offer, User } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get all offers.
        offer: async ()=> {
            return await Offer.find({});
        },
        // Get all users.
        user: async ()=> {
            return await User.find({});
        },
        // Get current user.
        me: async (parent, args, context) => {
            try {
                // Search current user based on id in context variable from auth.js middleware.
                const foundUser = await User.findOne({
                _id: context.user._id
                });
                console.log(foundUser)
                // If no user found, throw error.
                if (!foundUser) {
                throw AuthenticationError;
                }
                // Return user details for current user.
                return foundUser;
            } catch (error) {
                throw AuthenticationError;
            }
        }
    },
    Mutation: {
        createUser: async (parent, {username, email, password, business, postcode }, context) => {
            // Create new user
            try {
              const user = await User.create({username, email, password, business, postcode});
              // If no user variable, create method failed, throw error.
              if (!user) {
                throw AuthenticationError;
              }
              // Sign token called to create valid JWT for this new user.
              const token = signToken(user);

              // Return signed JWT and user details.
              return { token, user };
              // If signToken fails, throw error.
            } catch (error) {
              throw AuthenticationError;
            }
          },
          // Use email and password to log in
          login: async (parent, { email, password }, context) => {
            // Find user via email.
            const user = await User.findOne({  email: email  });

            // If no user found, return error.
            if (!user) {
                throw AuthenticationError;
            }
            
            // If user found, validate password.
            const correctPw = await user.isCorrectPassword(password);

            // If user found but password not valid, throw error.
            if (!correctPw) {
                throw AuthenticationError;
            }
            // If user found and password valid, sign JWT.
            const token = signToken(user);
            // Return signed JWT and user details.
            return { token, user };
          },
          saveOffer: async (parent, { offerId }, context) => {
            try {
                // Search current user based on id in context variable from auth.js middleware.
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // Add offerId to current users array.
                    { $addToSet: { savedOffers: offerId } },
                    // Options to return updated data and run validation.
                    { new: true, runValidators: true }
                );
              
                // If no updated data, update failed, throw error.
              if (!updatedUser) {
                throw AuthenticationError;
              }
              // Return updated user.
              return updatedUser
            } catch (err) {
              throw AuthenticationError;
            }
          },
          deleteOffer: async (parent, { offerId }, context) => {
            // Search current user based on id in context variable from auth.js middleware. 
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              // Remove offer from this users savedOffers array
              { $pull: { savedOffers: { offerId: offerId } } },
              // Return updated user details
              { new: true }
            );
            if (!updatedUser) {
                throw AuthenticationError;
            }
            return updatedUser;
          },
          // TO DO: Delete User
          // TO DO: Define User paths to auto populate offers when getting user data.
    }
};

module.exports = resolvers;
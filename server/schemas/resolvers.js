const { Offer, User, Business } = require('../models');


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
                // If no user found, throw error.
                if (!foundUser) {
                throw AuthenticationError;
                }
                // Return user details for current user.
                return foundUser;
            } catch (error) {
                throw AuthenticationError;
            }
        },
        business: async ()=> {
          return await Business.find({});
      },
      businessMe: async (parent, args, context) => {
        try {
          console.log("This is the context -", context.user);
            // Search current business based on id in context variable from auth.js middleware.
            const foundBusiness = await Business.findOne({
            _id: context.user._id
            });
            console.log(foundBusiness);
            // If no business found, throw error.
            if (!foundBusiness) {
            throw AuthenticationError;
            }
            // Return business details for current business.
            return foundBusiness;
        } catch (error) {
          console.log(error);
            throw AuthenticationError;
        }
    },
    },
    Mutation: {
        createUser: async (parent, {username, email, password, postcode }) => {
            // Create new user
            try {
              const user = await User.create({username, email, password, postcode});
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
          // TO DO: Business paths
          createBusiness: async (parent, {businessName, email, password, postcode, stampsRequired }, context) => {
            // Create new business
            try {
              const business = await Business.create({businessName, email, password, postcode, stampsRequired});
              // If no business variable, create method failed, throw error.
              if (!business) {
                throw AuthenticationError;
              }
              // Sign token called to create valid JWT for this new business.
              const token = signToken(business);

              // Return signed JWT and business details.
              return { token, business };
              // If signToken fails, throw error.
            } catch (error) {
              throw AuthenticationError;
            }
          },
          // Use email and password to log in
          businessLogin: async (parent, { email, password }, context) => {
            try {
            // Find business via email.
            const business = await Business.findOne({  email: email  });

            // If no business found, return error.
            if (!business) {
                throw AuthenticationError;
            }
            
            // If user found, validate password.
            const correctPw = await business.isCorrectPassword(password);

            // If user found but password not valid, throw error.
            if (!correctPw) {
                throw AuthenticationError;
            }
            // If user found and password valid, sign JWT.
            const token = signToken(business);
            // Return signed JWT and user details.
            return { token, business };
          } catch (err) {
            throw AuthenticationError
          }
          },
    addStamp: async (parent, { scannedId }, context) => {
      try{
        // Look up details of current user.
        const user = await User.findById({
          _id: context.user._id
        });

        // Get business name and stamps required from ID in scanned QR code.
        const business = await Business.findById({
          _id: scannedId
        }).select('businessName stampsRequired -_id');

        // If unable to locate user or business, throw error.
        if (!user || !business) {
          throw AuthenticationError;
        }

        // Function for findInex method.
        function findId(el) {
          // Checks to see if scanned ID matches an ID already int he array.
          if (el.businessId.toHexString() === scannedId) {
            return true
          } else {
            return false
          }
        }
        // find index returns the index if an element matches the scanned.
        const updatedEL = user.visits.findIndex(findId)

        // the findIndex method returns -1 if not found
        if (updatedEL < 0) {
          // If businessId not already in array, push new object with business data.
          user.visits.push({
            businessId: scannedId,
            visitCount: 1,
            businessName: business.businessName,
            stampsRequired: business.stampsRequired
          })
        } else {
          // If businessId already in the array add 1 visit.
          user.visits[updatedEL].visitCount++
        }

        await user.save();

        return user
      } catch (err) {
        throw AuthenticationError;
      }
    },
    // TO DO: Delete card route, will use when 'redeem card' button on front end is used.
  },

};

module.exports = resolvers;
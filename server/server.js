const express = require('express');

// Import Apoolo server and middleware
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const path = require('path');
// Import middleware from auth.js
const { authMiddleware } = require('./utils/auth');
// Import typeDefs, resolvers for GraphQL
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

// Set up new Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
}));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 
  // Once connection open runs server and logs messages.
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();

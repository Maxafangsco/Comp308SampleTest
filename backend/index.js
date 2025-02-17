require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`)
  );
});

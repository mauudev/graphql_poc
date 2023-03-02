// const { ApolloServer, gql } = require("apollo-server");

// // typeDefs tell the GraphQL server what data to expect
// // Notice the gql tag, this converts your string into GraphQL strings that can be read by Apollo
// const typeDefs = gql`
//   type Query {
//     hello: String!
//     randomNubmer: Int!
//   }
// `
// // the Query type outlines all the queries that can be called by the client
// // hello and randomNumber are the names of the queries
// // The exclamation mark (!) tells Apollo Server that a result is required

// // Here, we define two queries, one returns a String and another returns a Int


// // When a query is called a resolver with the same name is run
// // The API returns whatever is returned by the resolver
// // We are using arrow functions so the "return" keyword is not required
// const resolvers = {
//     // The name of the resolver must match the name of the query in the typeDefs
//     Query: {
//         // When the hello query is invoked "Hello world" should be returned
//         hello: () => "Hello world!",
//         // When we call the randomNumber query, it should return a number between 0 and 10
//         randomNumber: () => Math.round(Math.random() * 10),
//     },
// };


var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    rollDice: ({ numDice, numSides }) => {
        var output = [];
        for (var i = 0; i < numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)));
        }
        return output;
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

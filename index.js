const { ApolloServer, gql } = require("apollo-server");


const users = [
    {
        firstName: "GraphQL",
        lastName: "isCool",
        email: "GraphQL@isCool.com"
    },
];

const typeDefs = gql`
# GraphQL enables us to create our own types
# Notice the "User" type matches the shape of our "database" items

type User {
    firstName: String!
    lastName: String!
    email: String!
}

type Query {
    hello: String!
    randomNumber: Int!
    # This query is going to return all the users in our array
    # Since our "database" is an array containing objects, we need to create a "User" type
    # Brackets around the type indicates the query is returning an array
    queryUsers: [User]!
}
`;

const resolvers = {
    Query: {
        hello: () => "Hello world!",
        randomNumber: () => Math.round(Math.random() * 10),
        // queryUsers simply returns our users array
        queryUsers: () => users,
    },
};

// Create an instance of ApolloServer and pass in our typeDefs and resolvers
const server = new ApolloServer({
    // If the object key and value have the same name, you can omit the key
    typeDefs,
    resolvers,
});


// Start the server at port 8080
server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));

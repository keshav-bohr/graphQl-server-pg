const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
   type Query {
    users: [User!]
    me: User
    user(id: ID!): User

    messages: [Message!]
    message(id: ID!): Message!
  }

  type User {
    id: ID!      
    username: String!
  }

  type Message {
      id: ID!
      text: String!
  }
`;

let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
    },
    2: {
        id: '2',
        username: 'Dave Davids',
    },
};

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
    },
    2: {
        id: '2',
        text: 'By World',
    },
}

const me = users[1];

const resolvers = {
    Query: {

        // Arguments would be equal to the arguments given in the apollo server

        user: (parent, { id }) => {
            return users[id];
        },
        me: (parent, args, { me }) => {
            return me;
        },
        users: () => {
            return Object.values(users)
        },
        messages: () => {
            return Object.values(messages)
        },
        message: (parent, { id }) => {
            return messages[id]
        } 
    },

    User: {
        username: (parent) => parent.username
    }
};

const server = new ApolloServer({
    typeDefs, resolvers, context: {
        me: {
            username: 'Keshav Bohra'
        }
    }
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`),
);
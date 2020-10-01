import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import TodoResolvers from './resolvers/TodoResolvers';

export default async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolvers],
    emitSchemaFile: { path: './src/schema.graphql' },
    validate: false
  });
  return new ApolloServer({
    schema, context: ({ req, res }) => {
    return {req, res}
  }})
}




























// import { UserModel } from './entities/User';


// interface userInput {
//   username: string
//   email: string
//   password: string
// };

// const typeDefs = gql`
//   type User {
//     id: String!
//     username: String!
//     email: String!
//     password: String!
//     todoList: [Item]!
//   }

//   scalar Date

//   type Item {
//     key: String!
//     text: String!
//     date: Date!
//   }


//   type Query {
//     users: [User]!
//   }

//   type Mutation {
//     createUser(username: String! email: String! password: String!): User
//   }
// `

// const resolvers = {
//   Query: {
//     users: () => UserModel.find
//   },

//   Mutation: {
//     createUser: async (_: any, args: userInput) => {
//       try {
//         const { username, email, password } = args;
//         // const newUser = {
//         //   id: '321',
//         //   username: username,
//         //   email: email,
//         //   password: password,
//         //   todoList: []
//         // };

//         const newUser = await UserModel.create({
//           username: username,
//           email: email,
//           password: password,
//           todoList: []
//         });

//         return newUser;
        
//       } catch (error) {
//         throw (error);
//       }
//     }
//   }
// }


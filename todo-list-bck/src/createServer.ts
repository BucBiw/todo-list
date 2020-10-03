import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import TodoResolvers from './resolvers/TodoResolvers';
import { UserModel } from './entities/User';
import { AppContext } from './Types/index';
import { verifyToken, sendToken, createToken } from './utils/tokenHandler';

export default async () => {
  const schema = await buildSchema({
    resolvers: [TodoResolvers],
    emitSchemaFile: { path: './src/schema.graphql' },
    validate: false
  });
  return new ApolloServer({
    schema, context: async ({ req, res }: AppContext) => {
      const token = req.cookies[process.env.COOKIE_NAME!]
      if (token) {
        try {
          const decodedToken = verifyToken(token) as {
              userId: string,
              tokenVersion: number,
              iat: number,
              exp: number
          } | null
          if (decodedToken) {
            req.userId = decodedToken.userId;
            req.tokenVersion = decodedToken.tokenVersion;
            //Auto New Token
            if (Date.now() / 1000 - decodedToken.iat > 6 * 60 * 60) { //Auto New Token by 6 hr
              const user = await UserModel.findById(req.userId);
              if (user) {
                if (user.tokenVersion === req.tokenVersion) {
                  user.tokenVersion = user.tokenVersion + 1;
                  const updatedUser = await user.save();
                  if (updatedUser) {
                    //Create Token
                    const updatedToken = createToken(updatedUser.id, updatedUser.tokenVersion);
                    //Send token to frontend
                    sendToken(res, updatedToken);
                  }
                }
              }
            }
          }
        } catch (error) {
          req.userId = undefined
          req.tokenVersion = undefined
        }
        
      }
      return { req, res }
    }
  })
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


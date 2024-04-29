const { ApolloServer, gql } = require("apollo-server");

const userSchema = require("./schema/userSchema");
const movieSchema = require("./schema/movieSchema");

const server = new ApolloServer({
  typeDefs: [userSchema.typeDefs, movieSchema.typeDefs],
  resolvers: [userSchema.resolvers, movieSchema.resolvers],
  csrfPrevention: true,
  introspection: true,
  playground: true,
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

import { typeDefs, GET_INDIVIDUAL, GET_SECRET } from '../data/index';

export const resolvers = {
  Mutation: {
    register: (_root, { cmd }, { cache }) => {
      cache.writeQuery({
        query: GET_INDIVIDUAL,
        data: { cmd: cmd },
      });
    },
  },
};

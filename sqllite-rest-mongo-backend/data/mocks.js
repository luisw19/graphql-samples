import casual from 'casual';

//Casual Mocks for each type just define a function that gets run when an object of that type should be returned
//More info on mocking on https://www.apollographql.com/docs/graphql-tools/mocking.html
const mocks = {
  String: () => 'It works!',
  Query: () => ({
    author: (root, args) => {
      return { firstName: args.firstName, lastName: args.lastName };
    },
  }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};

export default mocks;

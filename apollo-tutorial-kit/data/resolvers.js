const resolvers = {
  Query: {
    author(root, args) {
      return { id: 1, firstName: 'Hola', lastName: 'Mundo' };
    },
    allAuthors() {
      return [{ id: 1, firstName: 'Hola', lastName: 'Mundo' }];
    }
  },
  Author: {
    posts(author) {
      return [
        { id: 1, title: 'Blog', text: 'Texto', views: 2 },
        { id: 2, title: 'Otro Blog', text: 'Mas Texto', views: 200 }
      ];
    }
  },
  Post: {
    author(post) {
      return { id: 1, firstName: 'Hola', lastName: 'Mundo' };
    }
  }
};

export default resolvers;

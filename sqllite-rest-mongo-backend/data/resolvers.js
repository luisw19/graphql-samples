import {
  Author,
  Post,
  View,
  FortuneCookie
} from './connectors';

const resolvers = {
  //Query Document with 2 queries
  Query: {
    //operation to get an Author
    author(_, args) {
      return Author.find({
        where: args
      });
    },
    //operation to get all Authors
    allAuthors(_, args) {
      return Author.findAll();
    },
    //operation to get random fortue cookie by fetching fortune cookie REST API
    getFortuneCookie(_, args) {
      return FortuneCookie.getOne();
    }
  },
  //Author Object Type
  Author: {
    //post field
    posts(author) {
      return author.getPosts();
    }
  },
  //Post object type
  Post: {
    //author field
    author(post) {
      return post.getAuthor();
    },
    //views field
    views(post) {
      return View.findOne({
        postId: post.id
      }).then(view => view.views);
    }
  }
};

export default resolvers;

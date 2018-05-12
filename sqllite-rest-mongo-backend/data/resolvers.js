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
      console.log("Query.author" + " with: " + JSON.stringify(args));
      return Author.find({
        where: args
      });
    },
    //operation to get all Authors
    allAuthors(_, args) {
      console.log("Query.allAuthors");
      return Author.findAll();
    },
    //operation to get random fortue cookie by fetching fortune cookie REST API
    getFortuneCookie(_, args) {
      return FortuneCookie.getOne();
    }
  },
  //Resolver for Author Object Type. Each field can have a resolver and this will take precedence over resolver in the Query type.
  Author: {
    //Uncomment and see how values for firstName and lastName take precedence over those obtained in the resolver for author Query
    /*firstName(_){
      // The underscore (_) argument is the result of previous parent resolver using Author type, in this case author, or AllAuthors
      return _.firstName + " -overridden";
    },
    lastName(_){
      return _.lastName + " -overridden";
    },*/
    //post field
    posts(author) {
      console.log("Author.posts called");
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
      console.log("Post.views called");
      return View.findOne({
        postId: post.id
      }).then(view => view.views);
    }
  }
};



export default resolvers;

// Library to quickly fetch HTTP URLs. See: https://www.npmjs.com/package/node-fetch
import fetch from 'node-fetch';
//Library for interacting with MongoDB's
import Mongoose from 'mongoose';
//Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL. See http://docs.sequelizejs.com/
import Sequelize from 'sequelize';
//Casual is a fake data generator
import casual from 'casual';
//Library with utilities to deal with arrays and more (see https://colintoh.com/blog/lodash-10-javascript-utility-functions-stop-rewriting)
import _ from 'lodash';

////////////////////////////////////////////////
//SQL logic to pull Author and Post fields from SQL Lite

//Create new database
const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

//Define author table with firstName and lastName fields
const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

//Define Post table with title and text fields
const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

//Define relationships: An author has many Posts. Posts belongs to Author
AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

const Author = db.models.author;
const Post = db.models.post;

////////////////////////////////////////////////
//Mongo Logic to pull Views field from Mongo DB
Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost:27017/views', {
  useMongoClient: true
});

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);


////////////////////////////////////////////////
// API call
const FortuneCookie = {
  getOne() {
    return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
      .then(res => res.json())
      .then(res => {
        return res[0].fortune.message;
      });
  },
};

////////////////////////////////////////////////
// Mockdata generation for both SQL Lite and MongoDB
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).then((post) => { // <- the new part starts here
        // create some View mocks
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      });
    });
  });
});

////////////////////////////////////////////////
//Export constants
export { Author, Post, View, FortuneCookie};

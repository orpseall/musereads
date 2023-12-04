import { db_models } from "./db.model";

// relationships -------------
const {
  User,
  UserLikes,
  UserRecommend,
  UserReading,
  Book,
  BookRatings,
  BuyLinks,
  Comment,
  Reply,
  Genre,
  AuthorBooks,
  Author,
  BookGenre,
  sequelize,
} = db_models;

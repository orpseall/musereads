import { DataTypes, Sequelize } from "sequelize";
const { STRING, BOOLEAN, NOW, TINYINT, DOUBLE, INTEGER, DATE, TEXT } =
  DataTypes;
// initializing ORM (Sequelize)
export const sequelize = new Sequelize("museread_db", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
  port: 8889,
});
/* models */

// User
/* 
* user_accounts may have many reads, 
want_to_reads, readings, comments, likes , 
user_recommended, ratings
*/
const User = sequelize.define("user_accounts", {
  fullname: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  ban: {
    type: TINYINT,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

const Follower = sequelize.define("followers", {
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  followingId: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// Books
/** 
 * books may have many genres, authors, likes
 reviews, ratings, buy_links
 */
const Book = sequelize.define("books", {
  title: {
    type: STRING,
    allowNull: false,
  },
  imgUrl: {
    type: TEXT,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  pages: {
    type: DOUBLE,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// Book Ratings
/**
 * A book may have many ratings
 * A user may rate many books
 */
const BookRatings = sequelize.define("book_ratings", {
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  rating: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// buy links
/**
 * A book may have many buy links
 */
const BuyLinks = sequelize.define("buylinks", {
  title: {
    type: STRING,
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
  url: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// user likes
/**
 * A user may have many likes
 */
const UserLikes = sequelize.define("userlikes", {
  commentId: {
    type: INTEGER,
    allowNull: false,
  },
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// Genres
/**
 * Genres may belong to many books
 */
const Genre = sequelize.define("genres", {
  title: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

const BookGenre = sequelize.define("bookgenres", {
  bookId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
  },
  genreId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Genre,
      key: "id",
    },
  },
});

// Authors
/**
 * Authors have many Books
 * Books may have many Authors
 */
const Author = sequelize.define("authors", {
  fullname: {
    type: STRING,
    allowNull: false,
  },
});

// junction (union) between books and authors
const AuthorBooks = sequelize.define("authorbooks", {
  bookId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: "id",
    },
  },
  authorId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: Author,
      key: "id",
    },
  },
});

// Comments

/**
 * a comment may belong to a book
 * a comment may belong to a user
 */

const Comment = sequelize.define("comments", {
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
  comment: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// Reply

/**
 * a reply may belong to a book
 * a reply may belong to a user
 * a reply may belong to a comment
 */

const Reply = sequelize.define("replies", {
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  commentId: {
    type: INTEGER,
    allowNull: false,
  },
  reply: {
    type: STRING,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// User Recommendations

/**
 * a user_recommend may belong to a book
 * a user_recommend may belong to a user
 */

const UserRecommend = sequelize.define("user_recommends", {
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
  targerUserId: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

// User Reading

/**
 * a user may have many readings
 * a book may have many readings
 */

const UserReading = sequelize.define("user_readings", {
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  bookId: {
    type: INTEGER,
    allowNull: false,
  },
  done_reading: {
    type: TINYINT,
    allowNull: false,
  },
  wish_to_read: {
    type: TINYINT,
    allowNull: false,
  },
  pageReached: {
    type: DOUBLE,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: NOW,
  },
});

const Feed = sequelize.define("feeds", {
  userAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM(
      "liked",
      "followed",
      "commented",
      "set_to_reading",
      "recommended",
      "set_to_done_reading"
    ),
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  commentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  targetUserId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

/**
 * ----------------------------------------------------
 * USER Relations
 */

// user - followers & followings relations
// User.hasMany(Follower, {
//   foreignKey: "userAccountId",
// });
// Follower.belongsTo(User, {
//   foreignKey: "userAccountId",
// });

// Follower.belongsTo(User, {
//   foreignKey: "followingId",
// });
// User.hasMany(Follower, {
//   foreignKey: "followingId",
// });

// // user - followers & followings relations
// User.hasMany(Follower, {
//   foreignKey: "userAccountId",
//   as: "user_account",
// });
// Follower.belongsTo(User, {
//   foreignKey: "userAccountId",
//   as: "user_accounts",
// });

// Follower.belongsTo(User, {
//   foreignKey: "followingId",
//   as: "followings",
// });
// User.hasMany(Follower, {
//   foreignKey: "followingId",
//   as: "followings",
// });
// -------------------------
User.hasMany(Follower, {
  foreignKey: "userAccountId",
  as: "followings",
});

Follower.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "userAccount",
});

Follower.belongsTo(User, {
  foreignKey: "followingId",
  as: "following",
});

User.hasMany(Follower, {
  foreignKey: "followingId",
  as: "followers",
});

// feed Relations
User.hasMany(Feed, {
  foreignKey: "userAccountId",
  as: "feedsByUser",
});
Feed.belongsTo(User, { foreignKey: "userAccountId", as: "users" });

Feed.belongsTo(User, { foreignKey: "targetUserId", as: "targetUser" });
User.hasMany(Feed, {
  foreignKey: "targetUserId",
  as: "feedsByTargetUser",
});
// ----------------------------

// User - UserReading relation (1 to many)
User.hasMany(UserReading);
UserReading.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "user_accounts",
});

// User - Likes relation (1 to many)
User.hasMany(UserLikes);
UserLikes.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "user_accounts",
});

//  User - user_recommend relation (1 to many)
User.hasMany(UserRecommend);
UserRecommend.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "users",
});

UserRecommend.belongsTo(User, {
  foreignKey: "targerUserId",
  as: "user_accounts",
});
User.hasMany(UserRecommend);

//  User - BookRatings relation (1 to many)
User.hasMany(BookRatings);
BookRatings.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "user_accounts",
});

//  User - comment relation (1 to many)
User.hasMany(Comment);
Comment.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "user_accounts",
});

//  User - reply relation (1 to many)
User.hasMany(Reply);
Reply.belongsTo(User, {
  foreignKey: "userAccountId",
  as: "user_accounts",
});

/**
 * ----------------------------------------------------
 * Comment Relations
 */

Comment.hasMany(Reply);
Reply.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "comments",
});

Comment.hasMany(UserLikes);
UserLikes.belongsTo(Comment, {
  foreignKey: "commentId",
  as: "comments",
});

/**
 * ----------------------------------------------------
 * Book Relations
 */

Book.hasMany(UserReading);
UserReading.belongsTo(Book, {
  foreignKey: "bookId",
  as: "books",
});

Book.hasMany(BookRatings);
BookRatings.belongsTo(Book, {
  foreignKey: "bookId",
  as: "books",
});

Book.hasMany(Comment);
Comment.belongsTo(Book, {
  foreignKey: "bookId",
  as: "books",
});

Book.hasMany(UserRecommend);
UserRecommend.belongsTo(Book, {
  foreignKey: "bookId",
  as: "books",
});

Book.hasMany(BuyLinks);
BuyLinks.belongsTo(Book, {
  foreignKey: "bookId",
  as: "books",
});

/**
 * Many to many relations between books and Genres
 * HomeGoing can be classified as Fiction & Adventure
 * Fiction and Adventure can be associated with Things Fall Apart & Half Of A Yellow Sun
 */
Book.belongsToMany(Genre, { through: BookGenre });
Genre.belongsToMany(Book, { through: BookGenre });

/**
 * Many to many relations between books and Authors
 * Authors may combine to have a book
 * A book may have many authors
 */

Book.belongsToMany(Author, { through: AuthorBooks });
Author.belongsToMany(Book, { through: AuthorBooks });

// Feed Realtions
Book.hasMany(Feed);
Feed.belongsTo(Book, { foreignKey: "bookId", as: "books" });

Comment.hasMany(Feed);
Feed.belongsTo(Comment, { foreignKey: "commentId", as: "comments" });

export const db_models = {
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
  Author,
  AuthorBooks,
  BookGenre,
  Follower,
  Feed,
  sequelize,
};

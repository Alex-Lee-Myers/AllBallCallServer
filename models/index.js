const UserModel = require('./usermodel');
const VideoPostModel = require('./videopostmodel');
const CommentsModel = require('./commentsmodel');
// const LikesModel = require('./likesmodel');
// const DislikesModel = require('./dislikesmodel');
// const Bookmarks = require('./bookmarksmodel');
// require the teamsArray
// const teamsArray = require('./teamsArray'); // uncomment this line if you want to use the teamsArray in lines 33-37

// Make videoID definited as a UUID
const uuid = require('uuid');


//! Types of associations: (Start)
//? 1. HasMany
//? 2. BelongsTo
//? 3. HasOne
//? 4. BelongsToMany
//! Types of associations. (End)

//? ______________________________________________
//? VIDEOS SECTION | START
//? ______________________________________________
//! Users can have many videos
UserModel.hasMany(VideoPostModel, {
    onDelete: 'CASCADE',
    });

//! Videos must belong to a user
VideoPostModel.belongsTo(UserModel, {
    onDelete: "CASCADE",
});

//? ______________________________________________
//? VIDEOS SECTION | END
//? ______________________________________________

//! ______________________________________________
//! ______________________________________________

//? ______________________________________________
//? COMMENTS SECTION | START
//? ______________________________________________
//! Videos can have many comments
// this is the foreign key for the comments table
VideoPostModel.hasMany(CommentsModel, {
    onDelete: 'CASCADE',
});

//! Comments must belong to a video
CommentsModel.belongsTo(VideoPostModel, {
    onDelete: 'CASCADE',
});

//! Users can have many comments
UserModel.hasMany(CommentsModel, {
    onDelete: 'CASCADE',
});

//! Comments must belong to a user
CommentsModel.belongsTo(UserModel, {
    onDelete: 'CASCADE',
});

//? ______________________________________________
//? COMMENTS SECTION | END
//? ______________________________________________

//! Users can have many likes
// UserModel.hasMany(LikesModel, {
//     foreignKey: 'likeUser',
//     as: 'likes',
// });

//! Videos can have many likes
// VideoPostModel.hasMany(LikesModel, {
//     foreignKey: 'likeVideoID',
//     as: 'likes',
// });

//! Users can have many dislikes
// UserModel.hasMany(DislikesModel, {
//     foreignKey: 'dislikeUser',
//     as: 'dislikes',
// });

//! Users can bookmark videos
// UserModel.hasMany(BookmarkModel, {
//     foreignKey: 'bookmarkUser',
//     as: 'bookmarks',
// });

//! Videos can have likes
// VideoPostModel.hasMany(LikesModel, {
//     foreignKey: 'likeVideoID',
//     as: 'likes',
// });


//! Videos can have dislikes
// VideoPostModel.hasMany(DislikesModel, {
//     foreignKey: 'dislikeVideoID',
//     as: 'dislikes',
// });


//! Export the models
module.exports = {
    UserModel,
    VideoPostModel,
    CommentsModel,
    // LikesModel,
    // DislikesModel,
    // Bookmarks,
};

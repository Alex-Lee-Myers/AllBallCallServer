const db = require('../db');

const UserModel = require('./usermodel');
const VideoPostModel = require('./videopostmodel');
const CommentsModel = require('./commentsmodel');
// const LikesModel = require('./likesmodel');
// const DislikesModel = require('./dislikesmodel');
// const Bookmarks = require('./bookmarksmodel');

//! Types of associations:
//? 1. HasMany
//? 2. BelongsTo
//? 3. HasOne
//? 4. BelongsToMany

//! Users can have many videos
UserModel.hasMany(VideoPostModel, {
    foreignKey: 'videoOwner',
    as: 'videos',
});

//! Username can have many videos
UserModel.hasMany(VideoPostModel, {
    foreignKey: 'username',
});

//! Videos can have many comments
VideoPostModel.hasMany(CommentsModel, {
    foreignKey: 'commentVideoID',
    as: 'comments',
});

//! Users can have many comments
UserModel.hasMany(CommentsModel, {
    foreignKey: 'commentUser',
    as: 'comments',
});

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
